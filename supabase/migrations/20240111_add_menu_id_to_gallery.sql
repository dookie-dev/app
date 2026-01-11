-- Add menu_id to gallery table to link images to products
alter table
    public.gallery
add
    column if not exists menu_id uuid references public.menus(id) on delete
set
    null;

-- Add index for performance
create index if not exists idx_gallery_menu_id on public.gallery(menu_id);

-- Update RLS if needed (already covers 'all' for authenticated)