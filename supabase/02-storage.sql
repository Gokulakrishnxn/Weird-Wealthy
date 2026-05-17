-- Step 2 — Run AFTER 01-schema-core.sql (optional but needed for image uploads)

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-images', 'post-images', true, 5242880,
  array['image/jpeg','image/png','image/webp','image/gif','image/avif']
) on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars', 'avatars', true, 2097152,
  array['image/jpeg','image/png','image/webp','image/avif']
) on conflict (id) do nothing;

drop policy if exists "auth_upload_post_images" on storage.objects;
drop policy if exists "public_read_post_images" on storage.objects;
drop policy if exists "auth_delete_own_post_images" on storage.objects;
drop policy if exists "auth_upload_avatars" on storage.objects;
drop policy if exists "public_read_avatars" on storage.objects;
drop policy if exists "auth_delete_own_avatar" on storage.objects;

create policy "auth_upload_post_images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'post-images');

create policy "public_read_post_images" on storage.objects
  for select using (bucket_id = 'post-images');

create policy "auth_delete_own_post_images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'post-images' and owner = auth.uid());

create policy "auth_upload_avatars" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars');

create policy "public_read_avatars" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "auth_delete_own_avatar" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and owner = auth.uid());
