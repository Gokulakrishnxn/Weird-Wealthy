import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminPostsTable } from "./admin-posts-table";


export default async function AdminPostsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*, authors(id, name, slug)")
    .order("created_at", { ascending: false });

  const { data: authors } = await supabase
    .from("authors")
    .select("id, name")
    .eq("is_active", true)
    .order("name");

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">All posts</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage every post across all authors</p>
      </div>
      <AdminPostsTable posts={posts ?? []} authors={authors ?? []} />
    </div>
  );
}
