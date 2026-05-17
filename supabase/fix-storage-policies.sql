-- Run this if schema.sql failed on storage delete policies (uuid = text error)

drop policy if exists "auth_delete_own_post_images" on storage.objects;
drop policy if exists "auth_delete_own_avatar" on storage.objects;

create policy "auth_delete_own_post_images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'post-images' and owner = auth.uid());

create policy "auth_delete_own_avatar" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and owner = auth.uid());
