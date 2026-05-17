-- Step 1 — Run this FIRST in Supabase → SQL → New query
-- Creates authors + posts tables, RLS, and policies (no storage)

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.authors (
  id           uuid        primary key default gen_random_uuid(),
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
  id           uuid        primary key default gen_random_uuid(),
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

create index if not exists authors_user_id_idx on public.authors(user_id);
create index if not exists authors_slug_idx    on public.authors(slug);
create index if not exists posts_slug_idx      on public.posts(slug);
create index if not exists posts_author_id_idx on public.posts(author_id);
create index if not exists posts_category_idx  on public.posts(category);
create index if not exists posts_status_idx    on public.posts(status);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------

create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists authors_updated_at on public.authors;
create trigger authors_updated_at
  before update on public.authors
  for each row execute function public.handle_updated_at();

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.authors enable row level security;
alter table public.posts   enable row level security;

create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.authors
    where user_id = auth.uid() and role = 'admin' and is_active = true
  );
$$;

create or replace function public.current_author_id()
returns uuid language sql security definer stable as $$
  select id from public.authors
  where user_id = auth.uid()
  limit 1;
$$;

-- authors policies
drop policy if exists "public_read_active_authors" on public.authors;
drop policy if exists "admin_read_all_authors" on public.authors;
drop policy if exists "admin_manage_authors" on public.authors;
drop policy if exists "author_update_own_profile" on public.authors;

create policy "public_read_active_authors" on public.authors
  for select using (is_active = true);

create policy "admin_read_all_authors" on public.authors
  for select using (public.is_admin());

create policy "admin_manage_authors" on public.authors
  for all using (public.is_admin()) with check (public.is_admin());

create policy "author_update_own_profile" on public.authors
  for update using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- posts policies
drop policy if exists "public_read_published_posts" on public.posts;
drop policy if exists "author_read_own_posts" on public.posts;
drop policy if exists "admin_read_all_posts" on public.posts;
drop policy if exists "author_insert_own_posts" on public.posts;
drop policy if exists "author_update_own_posts" on public.posts;
drop policy if exists "author_delete_own_posts" on public.posts;
drop policy if exists "admin_manage_all_posts" on public.posts;

create policy "public_read_published_posts" on public.posts
  for select using (status = 'published');

create policy "author_read_own_posts" on public.posts
  for select using (author_id = public.current_author_id());

create policy "admin_read_all_posts" on public.posts
  for select using (public.is_admin());

create policy "author_insert_own_posts" on public.posts
  for insert with check (author_id = public.current_author_id());

create policy "author_update_own_posts" on public.posts
  for update using (author_id = public.current_author_id())
  with check (author_id = public.current_author_id());

create policy "author_delete_own_posts" on public.posts
  for delete using (author_id = public.current_author_id());

create policy "admin_manage_all_posts" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());
