/**
 * Seed script — imports existing static blog posts into Supabase.
 * Run once: npx tsx scripts/seed-posts.ts
 *
 * Prerequisites:
 *   1. NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY set in .env.local
 *   2. Schema already applied (supabase/schema.sql)
 *   3. At least one author row exists with role='admin' (created manually via Supabase dashboard)
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { blogPosts } from "../lib/blog/posts";
import type { Database } from "../lib/supabase/types";

config({ path: ".env.local" });

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log("Fetching admin author...");
  const { data: adminAuthor } = await supabase
    .from("authors")
    .select("id")
    .eq("role", "admin")
    .single();

  if (!adminAuthor) {
    console.error("No admin author found. Create one in the Supabase dashboard first.");
    process.exit(1);
  }

  console.log(`Seeding ${blogPosts.length} posts under author ${adminAuthor.id}...`);

  for (const post of blogPosts) {
    const { error } = await supabase.from("posts").upsert(
      {
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: post.category,
        image_url: post.image,
        author_id: adminAuthor.id,
        status: "published",
        published_at: new Date(post.createdAt).toISOString(),
        read_time: post.readTime,
        content: null,
        content_html: null,
      },
      { onConflict: "slug" }
    );
    if (error) console.error(`  ✗ ${post.slug}: ${error.message}`);
    else console.log(`  ✓ ${post.slug}`);
  }

  console.log("Done.");
}

seed().catch(console.error);
