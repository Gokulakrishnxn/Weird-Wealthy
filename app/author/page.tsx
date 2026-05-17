import Link from "next/link";
import { BookOpen, CheckCircle, FileText, PenLine } from "lucide-react";
import { getCurrentAuthor, createSupabaseServerClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/cms/stats-card";
import { PostStatusBadge } from "@/components/cms/post-status-badge";
import { buttonVariants } from "@/components/ui/button";
import { formatDate, cn } from "@/lib/utils";

export default async function AuthorOverviewPage() {
  const author = await getCurrentAuthor();
  if (!author) return null;

  const supabase = await createSupabaseServerClient();

  const [
    { count: total },
    { count: published },
    { count: drafts },
    { data: recentPosts },
  ] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("author_id", author.id),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("author_id", author.id).eq("status", "published"),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("author_id", author.id).eq("status", "draft"),
    supabase.from("posts").select("id, title, status, created_at").eq("author_id", author.id).order("updated_at", { ascending: false }).limit(5),
  ]);

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Good to see you, {author.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's what's happening with your posts</p>
        </div>
        <Link href="/author/posts/new" className={cn(buttonVariants())}>
          <PenLine className="size-4" />
          Write post
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Total posts" value={total ?? 0} icon={BookOpen} />
        <StatsCard label="Published" value={published ?? 0} icon={CheckCircle} />
        <StatsCard label="Drafts" value={drafts ?? 0} icon={FileText} />
      </div>

      <div className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold">Recent posts</h2>
          <Link href="/author/posts" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            View all
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentPosts?.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">No posts yet.</p>
              <Link href="/author/posts/new" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>
                Write your first post
              </Link>
            </div>
          )}
          {recentPosts?.map((post) => (
            <Link
              key={post.id}
              href={`/author/posts/${post.id}/edit`}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-elevated/30"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{post.title}</p>
                <p className="text-xs text-muted-foreground">{formatDate(post.created_at)}</p>
              </div>
              <PostStatusBadge status={post.status as "draft" | "published" | "archived"} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
