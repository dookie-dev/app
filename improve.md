MASTER PROMPT: Cookie CMS Dashboard + Website (Next.js + TS + Supabase)
🎯 ROLE

คุณคือ Senior Fullstack Engineer + Product Architect
เชี่ยวชาญ:

Next.js (App Router)

TypeScript

Supabase (DB, Storage, Auth)

Headless CMS

Dashboard UX สำหรับร้านค้า

SEO / Performance / AI Discovery

🎯 GOAL

สแกนโปรเจค Next.js + TS ที่มีอยู่

สร้าง Dashboard (Admin CMS) สำหรับ:

Upload รูป

จัดการ Menu / Reviews / Gallery / Content

ออกแบบ Database Schema (Supabase)

เชื่อม Supabase:

Database

Storage (Images)

ปรับ Website ร้านคุกกี้:

Fetch ข้อมูลจาก Supabase

แสดงผล Dynamic

ออกแบบ Config / Settings ที่ควรมี

ทำงานเป็น Phase (ห้ามข้าม)

🧠 GLOBAL RULES (IMPORTANT)

❌ ห้าม hardcode content

❌ ห้าม mock data

❌ ห้ามข้าม phase

❌ ห้าม refactor ทั้งโปรเจคโดยไม่จำเป็น

✅ ใช้ App Router

✅ แยก Admin / Website ชัดเจน

✅ Production-ready

✅ SEO + Performance friendly

🧩 PHASE 0: PROJECT SCAN (MANDATORY)
TASK

วิเคราะห์โครงสร้างโปรเจคปัจจุบัน

ตรวจสอบ:

App Router / Pages Router

Existing components

Existing layout

Auth system (ถ้ามี)

สรุป:

จุดที่ใช้ซ้ำได้

จุดที่ต้องเพิ่ม

จุดที่ไม่ควรแตะ

OUTPUT

Project Architecture Summary

Proposed Folder Structure (Admin / Web)

🧩 PHASE 1: INFORMATION ARCHITECTURE
DASHBOARD PAGES (ADMIN)

ต้องมีอย่างน้อย:

Dashboard Home

Total Menu

Total Reviews

Total Gallery Images

Last Updated

Menu Management

CRUD Menu

ราคา

รูป

Status (available / out of stock / hidden)

Gallery / Reviews

Upload รูป

Caption

Type: gallery | review

Pin / Highlight

Content / Pages

Home sections

About

Contact

Promotion / Banner

Settings

Website config

SEO

Social / LINE OA

Theme config

🧩 PHASE 2: DATABASE SCHEMA (SUPABASE)
DESIGN TABLES (REQUIRED)
1️⃣ menus
id (uuid, pk)
name
description
price
image_url
status (active, hidden, out_of_stock)
created_at

2️⃣ gallery
id
title
image_url
type (gallery, review)
is_featured
created_at

3️⃣ contents
id
key (home_hero, about_text, contact_info)
title
content
image_url

4️⃣ site_settings
id
site_name
line_oa
phone
facebook
instagram
seo_title
seo_description

5️⃣ users (supabase auth)

ใช้ Supabase Auth
Role: admin / editor

STORAGE

Bucket: images

Path:

/menu/

/gallery/

/content/

🧩 PHASE 3: SUPABASE INTEGRATION
TASK

Setup Supabase client (server + client)

Auth Guard สำหรับ Admin

Upload image → Storage

Save public URL → DB

🧩 PHASE 4: ADMIN DASHBOARD UI
REQUIREMENTS

Minimal

ใช้งานง่าย

Mobile-friendly

CRUD ครบ

Loading / Error state

STACK

Server Actions

Client Components เฉพาะที่จำเป็น

Reusable Form Component

🧩 PHASE 5: WEBSITE (COOKIE STORE)
UPDATE WEBSITE TO:

Fetch Menu จาก Supabase

Fetch Gallery / Reviews

Fetch Content (Home, Contact)

HOME PAGE

Hero (Configurable)

Menu Highlight

Review Slider

CTA → LINE OA

MENU PAGE

Dynamic Menu Cards

Status-based display

CONTACT

Dynamic content

LINE OA link

Social links

🧩 PHASE 6: CONFIG & SETTINGS (IMPORTANT)
CONFIGURABLE VIA DASHBOARD
🛠 Site

Site Name

Logo

Favicon

📞 Contact

LINE OA ID

Phone

Social links

🎨 UI

Primary Color

Button Style

Banner image

🔍 SEO

Meta Title

Meta Description

OpenGraph Image

🧩 PHASE 7: QUALITY CHECK
MUST CHECK

SEO Friendly

Image lazy load

Error handling

Empty state

Permission control

Performance

🧩 FINAL OUTPUT EXPECTED

Folder Structure

Supabase Schema

Dashboard Pages

Website Updated

Fetch Logic

Config-driven Content

Ready to deploy

🔚 FINAL COMMAND

ทำงานทีละ Phase
ห้ามข้าม
ห้ามสรุปสั้น
ต้องเขียนโค้ดจริง
ต้องใช้งานได้จริง