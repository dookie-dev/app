-- 1. Create the 'images' bucket if it doesn't exist
insert into
    storage.buckets (id, name, public)
values
    ('images', 'images', true) on conflict (id) do nothing;

-- 2. Allow Public Read Access to 'images' bucket
create policy "Public Access" on storage.objects for
select
    using (bucket_id = 'images');

-- 3. Allow Authenticated Users to Upload/Insert
create policy "Authenticated Insert" on storage.objects for
insert
    to authenticated with check (bucket_id = 'images');

-- 4. Allow Authenticated Users to Update
create policy "Authenticated Update" on storage.objects for
update
    to authenticated using (bucket_id = 'images');

-- 5. Allow Authenticated Users to Delete
create policy "Authenticated Delete" on storage.objects for delete to authenticated using (bucket_id = 'images');