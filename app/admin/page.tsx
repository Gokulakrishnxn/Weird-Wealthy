import { BookOpen, CheckCircle, FileText, Users } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/cms/stats-card";
import { PostStatusBadge } from "@/components/cms/post-status-badge";
import { formatDate } from "@/lib/utils";

async function getAdminStats() {
  const supabase = await createSupabaseServerClient();

  const [
    { count: totalPosts },
    { count: published },
    { count: drafts },
    { count: totalAuthors },
    { data: recentPosts },
  ] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("authors").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase
      .from("posts")
      .select("id, title, status, category, created_at, authors(name)")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  return { totalPosts, published, drafts, totalAuthors, recentPosts };
}

export default async function AdminPage() {
  const { totalPosts, published, drafts, totalAuthors, recentPosts } = await getAdminStats();

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your publication at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Posts" value={totalPosts ?? 0} icon={BookOpen} />
        <StatsCard label="Published" value={published ?? 0} icon={CheckCircle} />
        <StatsCard label="Drafts" value={drafts ?? 0} icon={FileText} />
        <StatsCard label="Active Authors" value={totalAuthors ?? 0} icon={Users} />
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold">Recent posts</h2>
        </div>
        <div className="divide-y divide-border">
          {recentPosts?.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">No posts yet</p>
          )}
          {recentPosts?.map((post) => (
            <div key={post.id} className="flex items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{post.title}</p>
                <p className="text-xs text-muted-foreground">
                  {(post.authors as { name: string } | null)?.name ?? "Unknown"} ·{" "}
                  {formatDate(post.created_at)}
                </p>
              </div>
              <PostStatusBadge status={post.status as "draft" | "published" | "archived"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
