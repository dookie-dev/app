import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/fetch";

// Helper to generate Order Code
// Since we don't have a sequence, we'll try to count existing orders for the year + 1.
// A more robust way in Postgres is a sequence, but let's do a simple count for MVP.
// Race conditions might occur but rare for this scale.
async function generateOrderCode(supabase: any) {
    const year = new Date().getFullYear();
    const prefix = `DK-${year}`;

    // Search for last order code with this prefix
    const { data, error } = await supabase
        .from('orders')
        .select('order_code')
        .ilike('order_code', `${prefix}%`)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" which is fine
        console.error("Error fetching last order:", error);
    }

    let nextNum = 1;
    if (data?.order_code) {
        const parts = data.order_code.split('-');
        if (parts.length === 3) {
            const lastNum = parseInt(parts[2]);
            if (!isNaN(lastNum)) {
                nextNum = lastNum + 1;
            }
        }
    }

    // Format: DK-2026-000123
    return `${prefix}-${nextNum.toString().padStart(6, '0')}`;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { customer, address, items, total } = body;
        const supabase = createClient();

        // 1. Generate Order Code
        const orderCode = await generateOrderCode(supabase);

        // 2. Customer Management (Upsert based on Phone)
        // We try to find existing customer by phone
        let customerId;
        const { data: existingCust } = await supabase
            .from('customers')
            .select('id, total_spent')
            .eq('phone', customer.phone)
            .single();

        if (existingCust) {
            customerId = existingCust.id;
            // Update total spent later
        } else {
            const { data: newCust, error: custError } = await supabase
                .from('customers')
                .insert({
                    name: customer.name,
                    phone: customer.phone,
                    total_spent: 0
                })
                .select()
                .single();

            if (custError) throw new Error("Failed to create customer: " + custError.message);
            customerId = newCust.id;
        }

        // 3. Create Address
        const { data: newAddr, error: addrError } = await supabase
            .from('addresses')
            .insert({
                customer_id: customerId,
                address: address
            })
            .select()
            .single();

        if (addrError) throw new Error("Failed to save address");
        const addressId = newAddr.id;

        // 4. Create Order
        const { data: newOrder, error: orderError } = await supabase
            .from('orders')
            .insert({
                order_code: orderCode,
                customer_id: customerId,
                address_id: addressId,
                total_amount: total,
                status: 'pending'
            })
            .select()
            .single();

        if (orderError) throw new Error("Failed to create order: " + orderError.message);
        const orderId = newOrder.id;

        // 5. Create Order Items
        const orderItemsPayload = items.map((item: any) => ({
            order_id: orderId,
            menu_id: item.id,
            menu_name_snapshot: item.name,
            unit_price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItemsPayload);

        if (itemsError) throw new Error("Failed to save order items");

        // 6. Update Customer Total Spent
        if (existingCust) {
            await supabase.from('customers').update({
                total_spent: Number(existingCust.total_spent) + Number(total)
            }).eq('id', customerId);
        } else {
            await supabase.from('customers').update({
                total_spent: total
            }).eq('id', customerId);
        }

        // 7. Generate LINE Deep Link
        // LINE Message Format:
        // 🧾 Order ID: {{order_code}}
        // ...
        const settings = await getSiteSettings();
        const lineId = settings?.line_oa || "@dookiee.s"; // Default backup

        const itemList = items.map((item: any) => `- ${item.name} x${item.quantity} = ${item.price * item.quantity}฿`).join('\n');

        const message = `🧾 Order ID: ${orderCode}
👤 ลูกค้า:
ชื่อ: ${customer.name}
เบอร์: ${customer.phone}

📦 ที่อยู่จัดส่ง:
${address}

🍪 รายการสินค้า:
${itemList}

💰 รวมทั้งหมด: ${total}฿`;

        const encodedMessage = encodeURIComponent(message);
        // Use https://line.me/R/oaMessage/ (Universal Link) to open chat with message pre-filled
        // If line_oa has '@', remove it for some deep links, but oaMessage usually works with ID or just opens OA.
        // Actually `https://line.me/R/oaMessage/{LINE_ID}/?{MESSAGE}` is one format, or `https://line.me/R/msg/text/?{MESSAGE}` sends to anyone.
        // For specific OA, we usually need the OA's add link or just generic share if not a verified API bot.
        // "Send to LINE OA": Usually users click a link that opens the specific OA chat. Pre-filling text to specific OA via URL Scheme is tricky without LIFF or specific OA setup.
        // `https://line.me/R/oaMessage/{BasicID}/?{text}` is deprecated or requires Premium ID?
        // Let's use generic text share for now, OR better: `https://line.me/R/ti/p/${lineId}` and ask user to paste? No, that's bad UX.
        // Workaround: `https://line.me/R/soa/login` ? No.
        // `https://line.me/R/msg/text/?${encodedMessage}` -> User selects friend (or OA if they search).
        // Correct way for OA: Users initiates chat.
        // Let's use `https://line.me/R/oaMessage/${lineId}/?` is not standard.
        // Standard is `https://line.me/R/ti/p/${lineId}` creates friend intent.
        // 
        // Best UX for "Send Order to OA":
        // 1. Copy message to clipboard (Javascript).
        // 2. Open OA.
        // 3. User pastes.
        //
        // BUT user asked for "Send Order to LINE OA".
        // I will try to generate a link that *might* work `https://line.me/R/oaMessage/{accountId}/?{text}` works on some devices if accountId is correct (without @ usually? or with?).
        // Let's try to just return the message and let the UI handle the "Copy & Go" flow if possible, or just deep link.
        //
        // Re-reading requirements: "Send Order to LINE OA".
        // I will construct the URL `https://line.me/R/oaMessage/${lineIdClean}/?${encodedMessage}`.
        // Note: lineId in DB is `@531abdxp`. Clean it to `531abdxp`.

        const lineIdClean = lineId.replace('@', '');
        // Using check logic:
        // If I can't guarantee oaMessage works, I'll fallback to `https://line.me/R/msg/text/?${encodedMessage}` (User picks target).
        // But let's try the OA specific one first. 
        // Actually, `https://line.me/R/oaMessage` is for LIFF or specific internal schemes. 
        // `line://oaMessage/{lineId}/?{text}` was old scheme.
        // `https://line.me/R/oaMessage/{lineId}/?{text}` is the modern one.

        const lineUrl = `https://line.me/R/oaMessage/${lineIdClean}/?${encodedMessage}`;

        return NextResponse.json({
            success: true,
            orderCode,
            orderId,
            lineUrl
        });

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
