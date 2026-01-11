import { CartItem } from "@/types";

interface UserProfile {
    displayName: string;
}

export const generateLineLink = (cart: CartItem[], user?: UserProfile | null): string => {
    // 1. Validate Cart
    if (!cart || cart.length === 0) return "";

    const lineId = "@531abdxp";
    const customerName = user?.displayName || "(ลูกค้า)";

    // 2. Build Message
    let message = `🍪 สั่งซื้อคุกกี้จากเว็บไซต์\n\n👤 ลูกค้า: ${customerName}\n\n📦 รายการสินค้า:\n`;
    let total = 0;

    cart.forEach((item) => {
        const price = item.price * item.quantity;
        total += price;
        message += `- ${item.name} x${item.quantity} = ${price}฿\n`;
    });

    message += `\n💰 ราคารวม: ${total}฿\n\n📍 ที่อยู่จัดส่ง:\n(แจ้งในแชท)\n\nขอบคุณค่า 💕`;

    // 3. Encode strictly
    const encodedMessage = encodeURIComponent(message.trim());

    // 4. Return correct URL format
    return `https://line.me/R/oaMessage/${lineId}/?${encodedMessage}`;
};
