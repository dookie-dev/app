# Supabase Setup Instructions

## 1. Database Schema

Run the following SQL in your Supabase project's **SQL Editor**:

```sql
-- Create "menus" table
create table if not exists public.menus (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  category text null,
  image_url text null,
  is_best_seller boolean default false,
  sort_order integer default 0,
  status text default 'available', -- 'available', 'sold_out', 'hidden'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create "gallery" table (for reviews/portfolio)
create table if not exists public.gallery (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  filesize integer null, -- optional metadata
  width integer null,
  height integer null,
  caption text null,
  type text default 'gallery', -- 'gallery', 'review'
  is_featured boolean default false,
  customer_name text null, -- for reviews
  rating integer null, -- for reviews (1-5)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create "site_settings" table (singleton)
create table if not exists public.site_settings (
  id integer primary key default 1,
  site_name text default 'Dookiee.s',
  seo_title text default 'Dookiee.s | Handcrafted Soft Cookies',
  seo_description text default 'Premium soft cookies baked fresh daily.',
  contact_email text,
  phone text,
  address text,
  facebook_url text,
  instagram_url text,
  tiktok_url text,
  line_oa text,
  announcement_bar text,
  is_maintenance_mode boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint single_row check (id = 1)
);

-- Create "contents" table (for dynamic sections)
create table if not exists public.contents (
  id uuid default gen_random_uuid() primary key,
  section_key text unique not null, -- e.g. 'home_hero', 'about_story'
  title text,
  subtitle text,
  content text,
  image_url text,
  image_secondary_url text, -- for decorations
  meta jsonb, -- flexible json for extra fields
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE ROW LEVEL SECURITY
alter table public.menus enable row level security;
alter table public.gallery enable row level security;
alter table public.site_settings enable row level security;
alter table public.contents enable row level security;

-- PUBLIC READ POLICIES (Everyone can view)
create policy "Public read menus" on public.menus for select using (true);
create policy "Public read gallery" on public.gallery for select using (true);
create policy "Public read site_settings" on public.site_settings for select using (true);
create policy "Public read contents" on public.contents for select using (true);

-- ADMIN WRITE POLICIES (Only authenticated users can edit)
-- Note: Currently allow ANY authenticated user. For stricter control, add email checks.
create policy "Admins can insert menus" on public.menus for insert to authenticated with check (true);
create policy "Admins can update menus" on public.menus for update to authenticated using (true);
create policy "Admins can delete menus" on public.menus for delete to authenticated using (true);

create policy "Admins can insert gallery" on public.gallery for insert to authenticated with check (true);
create policy "Admins can update gallery" on public.gallery for update to authenticated using (true);
create policy "Admins can delete gallery" on public.gallery for delete to authenticated using (true);

create policy "Admins can update site_settings" on public.site_settings for update to authenticated using (true);
create policy "Admins can insert site_settings" on public.site_settings for insert to authenticated with check (true);

create policy "Admins can insert contents" on public.contents for insert to authenticated with check (true);
create policy "Admins can update contents" on public.contents for update to authenticated using (true);
create policy "Admins can delete contents" on public.contents for delete to authenticated using (true);

-- INSERT DEFAULT SETTINGS
insert into public.site_settings (id) values (1) on conflict do nothing;
```

## 2. Storage Setup

1. Go to **Storage** in Supabase Dashboard.
2. Create a new bucket named `images`.
3. Toggle "Public Bucket" to **ON**.
4. Save.
5. (Optional but recommended) Add a policy to allow authenticated uploads to this bucket.

## 3. Environment Variables

Add these to your Vercel project or `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
