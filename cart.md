คุณคือ Senior Full-Stack Engineer + System Architect + Product Designer

เชี่ยวชาญ:

Next.js (App Router)

Supabase (PostgreSQL)

SQL Schema Design

LINE Official Account Integration

Dashboard UX (Admin)

❗ ห้ามข้ามขั้น
❗ ห้ามลด feature
❗ ต้องคิดเผื่อ production, scale และ member system ในอนาคต

🎯 OBJECTIVE

อัพเดทเว็บขายคุกกี้ และระบบหลังบ้าน โดยใช้ ตาราง menus ที่มีอยู่แล้ว
เพิ่มระบบ Order เต็มรูปแบบ ตั้งแต่หน้าร้าน → LINE → หลังบ้าน

🧩 TECH STACK (ห้ามเปลี่ยน)

Frontend: Next.js (App Router)

Backend: Next.js API Routes

Database: Supabase (PostgreSQL)

Product Source: public.menus (ของเดิม)

Notification: LINE Official Account

Auth (future): Supabase Auth (ยังไม่ต้องทำ login)

🧠 CORE CONCEPT (สำคัญมาก)

menus = สินค้า (Product)

❌ ห้ามสร้าง products table ใหม่

Order Item ต้อง reference menus.id

ราคาและชื่อเมนูต้อง snapshot ณ วันที่สั่ง

เบอร์โทร = key สำหรับ member ในอนาคต

🛒 CUSTOMER FLOW (ต้องตรงตามนี้)

ลูกค้าเลือกเมนูจาก menus

Add to Cart

Cart แสดง:

เมนู

จำนวน

ราคาต่อหน่วย

ราคารวม

Checkout → กรอกข้อมูล:

ชื่อ

เบอร์โทรศัพท์

ที่อยู่จัดส่ง

กดปุ่ม “สั่งซื้อผ่าน LINE”

ระบบ:

Generate Order Code

ส่ง Order ไป LINE OA

Insert ข้อมูลทั้งหมดลง Supabase

🆔 ORDER CODE FORMAT
DK-YYYY-XXXXXX
ตัวอย่าง: DK-2026-000123


Unique

Increment ต่อปี

ใช้เป็น reference หลักทุกระบบ (LINE / Dashboard)

💬 LINE MESSAGE FORMAT (ต้องเหมือนนี้)
🧾 Order ID: {{order_code}}

👤 ลูกค้า:
ชื่อ: {{customer_name}}
เบอร์: {{phone}}

📦 ที่อยู่จัดส่ง:
{{address}}

🍪 รายการสินค้า:
- {{menu_name}} x{{quantity}} = {{subtotal}}฿

💰 รวมทั้งหมด: {{total_amount}}฿

🗄️ DATABASE DESIGN (Supabase)
✅ MENUS (มีอยู่แล้ว — ห้ามแก้)
public.menus

🆕 customers (เตรียม member future)
create table public.customers (
  id uuid default uuid_generate_v4() primary key,
  name text,
  phone text unique not null,
  total_spent numeric default 0,
  created_at timestamptz default now()
);

🆕 addresses
create table public.addresses (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.customers(id),
  address text not null,
  created_at timestamptz default now()
);

🆕 orders
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  order_code text unique not null,
  customer_id uuid references public.customers(id),
  address_id uuid references public.addresses(id),
  total_amount numeric not null,
  status text default 'pending'
    check (status in ('pending', 'paid', 'shipped', 'cancelled')),
  created_at timestamptz default now()
);

🆕 order_items (ผูกกับ menus)
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  menu_id uuid references public.menus(id),
  menu_name_snapshot text not null,
  unit_price numeric not null,
  quantity integer not null,
  subtotal numeric not null
);

🔁 BUSINESS LOGIC RULES

subtotal = unit_price * quantity

orders.total_amount = sum(order_items.subtotal)

customers.total_spent += orders.total_amount

phone ซ้ำ → ใช้ customer เดิม

ป้องกัน double submit

📊 DASHBOARD (Admin)
Dashboard ต้องมี:

📦 Order List

Order Code

วันที่

ชื่อลูกค้า

เบอร์

ยอดรวม

สถานะ

🔍 Order Detail

รายการสินค้า

จำนวน

ราคา

ที่อยู่จัดส่ง

📈 Summary

ยอดขายรวม

จำนวน Orders

ลูกค้าซื้อซ้ำ

Top Menu

🎨 UI / UX DIRECTION

Minimal

Warm / Bakery feeling

Card + Table

Mobile friendly

อ่านง่าย

ใช้โทนอบอุ่น (cream / brown / orange soft)

🔐 SECURITY & BEST PRACTICE

LINE + Supabase ต้องเรียกผ่าน API Route เท่านั้น

ไม่ expose service role key

Validate form ทุก field

Handle error + fallback

ใช้ transaction ตอน insert order

📁 SUGGESTED FOLDER STRUCTURE (Next.js)
app/
 ├─ api/
 │   ├─ checkout/
 │   └─ line/
 ├─ cart/
 ├─ checkout/
 ├─ dashboard/
 │   ├─ orders/
 │   └─ summary/
 └─ components/

🚀 DELIVERABLES (ต้องได้ครบ)

SQL Schema

Order Code Generator

Cart & Checkout UI

LINE Message Integration

Supabase Insert Logic

Dashboard Pages

Clear Explanation ทุกส่วน

❌ CONSTRAINTS

ห้ามสร้าง product table ใหม่

ห้าม skip schema

ห้ามลด feature

ต้องเผื่อ member system ในอนาคต

✅ FINAL RESULT

ระบบขายคุกกี้ที่:

ลูกค้าสั่งง่าย

Order ไป LINE

หลังบ้านดูง่าย

พร้อมต่อยอดเป็น Member / CRM / Loyalty