-- Step 3 — Run AFTER 01-schema-core.sql
-- 1. Create a user in Supabase → Authentication → Users (or sign up at /auth/login)
-- 2. Replace the email below with that user's email
-- 3. Run this query

insert into public.authors (user_id, name, slug, role, is_active)
select
  id,
  'Admin',           -- display name
  'admin',           -- public slug (must be unique)
  'admin',
  true
from auth.users
where email = 'you@example.com'   -- ← change this
on conflict (slug) do update set
  user_id = excluded.user_id,
  role = 'admin',
  is_active = true;

-- Verify:
-- select id, name, slug, role, user_id from public.authors;
