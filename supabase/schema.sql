-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. MENUS TABLE
create table public.menus (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric not null default 0,
  image_url text,
  category text not null default 'classic',
  status text not null default 'available' check (status in ('available', 'out_of_stock', 'hidden')),
  is_best_seller boolean default false,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. GALLERY / REVIEWS TABLE
create table public.gallery (
  id uuid default uuid_generate_v4() primary key,
  title text,
  image_url text not null,
  type text not null default 'gallery' check (type in ('gallery', 'review')),
  caption text,
  customer_name text, -- for reviews
  rating integer, -- for reviews
  is_featured boolean default false,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CONTENT TABLE (For dynamic sections)
create table public.contents (
  id uuid default uuid_generate_v4() primary key,
  section_key text not null unique, -- e.g., 'home_hero', 'about_story'
  title text,
  content text,
  image_url text,
  additional_data jsonb, -- Flexible field for extra props
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. SITE SETTINGS TABLE (Singleton)
create table public.site_settings (
  id integer primary key default 1 check (id = 1), -- Ensure only one row
  site_name text default 'Dookiee.s',
  line_oa text default '@531abdxp',
  phone text,
  facebook_url text,
  instagram_url text,
  tiktok_url text,
  seo_title text,
  seo_description text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default settings
insert into public.site_settings (id, site_name)
values (1, 'Dookiee.s')
on conflict (id) do nothing;

-- 5. STORAGE BUCKETS
-- Note: Buckets often need to be created via Dashboard, but this policy setup helps.
-- Requires enabling Storage in Supabase Dashboard first and creating a public bucket named 'images'.

-- RLS POLICIES (Example: Public Read, Admin Write)
alter table public.menus enable row level security;
alter table public.gallery enable row level security;
alter table public.contents enable row level security;
alter table public.site_settings enable row level security;

-- PUBLIC READ POLICIES
create policy "Public can read menus" on public.menus for select using (true);
create policy "Public can read gallery" on public.gallery for select using (true);
create policy "Public can read contents" on public.contents for select using (true);
create policy "Public can read settings" on public.site_settings for select using (true);

-- ADMIN WRITE POLICIES (Assuming authenticated users are admins for this MVP, or check role)
-- For simplicity in MVP, we allow authenticated users to write.
create policy "Admins can insert menus" on public.menus for insert to authenticated with check (true);
create policy "Admins can update menus" on public.menus for update to authenticated using (true);
create policy "Admins can delete menus" on public.menus for delete to authenticated using (true);

create policy "Admins can manage gallery" on public.gallery for all to authenticated using (true);
create policy "Admins can manage contents" on public.contents for all to authenticated using (true);
create policy "Admins can manage settings" on public.site_settings for all to authenticated using (true);
