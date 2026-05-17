-- ============================================================
-- Weird & Wealthy — CMS Database Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists public.authors (
  id           uuid        primary key default uuid_generate_v4(),
  user_id      uuid        references auth.users(id) on delete cascade,
  name         text        not null,
  slug         text        unique not null,
  bio          text,
  avatar_url   text,
  twitter_url  text,
  linkedin_url text,
  website_url  text,
  role         text        not null default 'author' check (role in ('admin', 'author')),
  is_active    boolean     not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.posts (
  id           uuid        primary key default uuid_generate_v4(),
  slug         text        unique not null,
  title        text        not null,
  description  text,
  content      jsonb,
  content_html text,
  category     text        not null,
  author_id    uuid        references public.authors(id) on delete set null,
  image_url    text,
  status       text        not null default 'draft' check (status in ('draft', 'published', 'archived')),
  read_time    text,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists authors_user_id_idx on public.authors(user_id);
create index if not exists authors_slug_idx    on public.authors(slug);
create index if not exists posts_slug_idx      on public.posts(slug);
create index if not exists posts_author_id_idx on public.posts(author_id);
create index if not exists posts_category_idx  on public.posts(category);
create index if not exists posts_status_idx    on public.posts(status);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================

create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger authors_updated_at
  before update on public.authors
  for each row execute function public.handle_updated_at();

create or replace trigger posts_updated_at
  before update on public.posts
  for each row execute function public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.authors enable row level security;
alter table public.posts   enable row level security;

-- Helper: check if current user is admin
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.authors
    where user_id = auth.uid() and role = 'admin' and is_active = true
  );
$$;

-- Helper: get current author id
create or replace function public.current_author_id()
returns uuid language sql security definer stable as $$
  select id from public.authors
  where user_id = auth.uid()
  limit 1;
$$;

-- ---- AUTHORS policies ----

-- Public: read active authors (for public post pages)
create policy "public_read_active_authors" on public.authors
  for select using (is_active = true);

-- Admin: read all authors
create policy "admin_read_all_authors" on public.authors
  for select using (public.is_admin());

-- Admin: full management
create policy "admin_manage_authors" on public.authors
  for all using (public.is_admin()) with check (public.is_admin());

-- Author: update own profile
create policy "author_update_own_profile" on public.authors
  for update using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ---- POSTS policies ----

-- Public: read published posts
create policy "public_read_published_posts" on public.posts
  for select using (status = 'published');

-- Author: read own posts (all statuses)
create policy "author_read_own_posts" on public.posts
  for select using (author_id = public.current_author_id());

-- Admin: read all posts
create policy "admin_read_all_posts" on public.posts
  for select using (public.is_admin());

-- Author: insert own posts
create policy "author_insert_own_posts" on public.posts
  for insert with check (author_id = public.current_author_id());

-- Author: update own posts
create policy "author_update_own_posts" on public.posts
  for update using (author_id = public.current_author_id())
  with check (author_id = public.current_author_id());

-- Author: delete own posts
create policy "author_delete_own_posts" on public.posts
  for delete using (author_id = public.current_author_id());

-- Admin: full management on all posts
create policy "admin_manage_all_posts" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

-- Run these via the Supabase dashboard Storage tab, or via API:
-- 1. Create bucket "post-images"  (public: true, file size limit: 5MB)
-- 2. Create bucket "avatars"      (public: true, file size limit: 2MB)

-- Storage policies (run after creating buckets):

-- post-images: public read
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

-- Authenticated users can upload to post-images
create policy "auth_upload_post_images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'post-images');

create policy "public_read_post_images" on storage.objects
  for select using (bucket_id = 'post-images');

create policy "auth_delete_own_post_images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'post-images' and owner = auth.uid());

-- Authenticated users can upload avatars
create policy "auth_upload_avatars" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars');

create policy "public_read_avatars" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "auth_delete_own_avatar" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and owner = auth.uid());
