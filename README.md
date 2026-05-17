# Weird & Wealthy

> *Where weird ideas meet lasting wealth*

A modern digital journal and content platform for builders and founders — covering AI, finance, personal branding, and lifestyle design for people who think differently and build accordingly.

---

## Overview

Weird & Wealthy is a full-stack web application built on **Next.js 16** with a custom headless CMS. It ships as a Progressive Web App (PWA) with offline support, a built-in AI chatbot, and a full author/admin content management system backed by Supabase.

The architecture separates public readers from content creators: the public-facing site is fast, static-first, and SEO-optimized, while the CMS dashboard gives authors and admins a rich editing experience with no page reloads.

---

## Features

### Public Site
- **Multi-category journal** — AI news, finance, personal branding, lifestyle, and more
- **Rich article pages** — full Tiptap-rendered HTML with optimized typography
- **Dark / light theme** — system-aware with manual toggle
- **Smooth scrolling** — Lenis-powered inertia scroll on desktop
- **Newsletter signup** — popup and dedicated page
- **AI Chatbot (Minty)** — Groq-powered assistant using `llama-3.3-70b-versatile`
- **PWA** — installable, offline-capable, splash screen, bottom tab nav on mobile
- **SEO** — per-page metadata, Open Graph, sitemap, robots.txt, structured data

### Author CMS (`/author`)
- **Rich text editor** — Tiptap v3 with formatting toolbar (headings, lists, code blocks, links, images)
- **Draft / Publish / Unpublish** — full post lifecycle management
- **Auto-save** — drafts saved automatically every 30 seconds
- **Card image upload** — drag-and-drop upload to Supabase Storage
- **Post preview** — authenticated preview of any post before publishing
- **Profile management** — avatar, bio, and social links

### Admin Dashboard (`/admin`)
- **Author management** — invite authors by email, edit roles, deactivate, delete
- **Full post oversight** — view and manage all posts across all authors
- **Category editor** — manage content categories
- **Stats overview** — published posts, drafts, total authors at a glance

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Primitives | Base UI (`@base-ui/react`) |
| Rich Text Editor | Tiptap v3 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| AI Chatbot | Groq API (`llama-3.3-70b-versatile`) |
| Animation | Motion, Lenis |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |
| Deployment | Vercel |

---

## Project Structure

```
├── app/
│   ├── (public routes)          # Blog, categories, article pages
│   ├── admin/                   # Admin-only dashboard
│   │   ├── authors/             # Author management
│   │   ├── posts/               # Post oversight
│   │   └── categories/          # Category management
│   ├── author/                  # Author dashboard
│   │   ├── posts/               # Post list + editor
│   │   └── profile/             # Author profile
│   ├── auth/                    # Login + OAuth callback
│   ├── preview/[slug]/          # Auth-gated post preview
│   └── api/chat/                # Minty chatbot API route
├── components/
│   ├── cms/                     # CMS-specific components (editor, toolbar, dialogs)
│   ├── blog/                    # Public blog components
│   ├── chatbot/                 # Minty chat widget
│   ├── pwa/                     # PWA shell, splash, service worker
│   └── ui/                      # Shared UI primitives
├── lib/
│   ├── supabase/                # Supabase client, server, admin, types
│   ├── blog/                    # Static blog data + categories (fallback)
│   └── utils.ts                 # Shared utilities
├── supabase/
│   └── schema.sql               # Full database schema with RLS policies
└── scripts/
    └── seed-posts.ts            # Seed static posts to Supabase
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Groq](https://console.groq.com) API key (for the AI chatbot)

### 1. Clone and install

```bash
git clone https://github.com/your-org/wierdandwealthy.git
cd wierdandwealthy
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase — Settings → API in your Supabase dashboard
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Groq — https://console.groq.com/keys
GROQ_API_KEY=<your-groq-key>
GROQ_MODEL=llama-3.3-70b-versatile
```

### 3. Set up the database

In Supabase → **SQL** → **New query**, run these files **in order** (copy/paste each file’s contents):

| Step | File | Purpose |
|------|------|---------|
| 1 | `supabase/01-schema-core.sql` | **Required** — `authors`, `posts`, RLS |
| 2 | `supabase/02-storage.sql` | Image upload buckets |
| 3 | `supabase/03-create-admin.sql` | Link your login user to admin |

Step 1 must succeed before step 3. If you see `relation "public.authors" does not exist`, step 1 did not run.

Verify tables exist:

```sql
select table_name from information_schema.tables
where table_schema = 'public' and table_name in ('authors', 'posts');
```

### 4. Create your admin author

1. Supabase → **Authentication** → **Users** → create a user (or sign up at `/auth/login`).
2. Open `supabase/03-create-admin.sql`, replace `you@example.com` with your email, and run it in the SQL editor.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the dashboard.

### 6. (Optional) Seed existing posts

```bash
npm run seed
```

Migrates the built-in static blog posts into your Supabase database under your admin author.

---

## Authentication & Roles

| Role | Access |
|---|---|
| `admin` | Full access — manage authors, all posts, categories |
| `author` | Own posts only — create, edit, publish, manage profile |
| Public | Read published posts only |

Access control is enforced at two layers:
1. **Middleware** — redirects unauthenticated users away from `/admin`, `/author`, and `/preview`
2. **Row Level Security** — Supabase RLS policies ensure database queries are always scoped correctly, even if middleware is bypassed

---

## Content Management

### Writing a post

1. Log in and go to `/author/posts/new`
2. Write in the Tiptap editor — supports headings, bold, italic, lists, code blocks, links, and inline images
3. Fill in the sidebar: URL slug, description, category, card image
4. **Save draft** at any time (also auto-saves every 30 seconds)
5. **Preview** the post before publishing at `/preview/[slug]`
6. **Publish** when ready — sets `published_at` and makes it live

### Inviting an author

1. Go to `/admin/authors/new`
2. Enter name, email, and role
3. Supabase sends a magic-link invitation email
4. The author row is pre-created so their profile is ready on first login

---

## Graceful Degradation

The public site works without Supabase configured. Every public page tries Supabase first and falls back to the built-in static blog data if the database is unavailable or unconfigured. This means the site is never broken — Supabase is additive, not a hard dependency for readers.

---

## Deployment

The project is optimized for **Vercel**. Push to your connected repository and set the environment variables in the Vercel dashboard.

```bash
# Production build check
npm run build
```

All CMS routes are server-rendered on demand (`ƒ Dynamic`). Public routes fall back to static generation where possible.

---

## License

Private — all rights reserved.
