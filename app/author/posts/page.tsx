import Link from "next/link";
import { Plus } from "lucide-react";
import { getCurrentAuthor, createSupabaseServerClient } from "@/lib/supabase/server";
import { MyPostsTable } from "./my-posts-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AuthorPostsPage() {
  const author = await getCurrentAuthor();
  if (!author) return null;

  const supabase = await createSupabaseServerClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", author.id)
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">{posts?.length ?? 0} posts</p>
        </div>
        <Link href="/author/posts/new" className={cn(buttonVariants())}>
          <Plus className="size-4" />
          New post
        </Link>
      </div>
      <MyPostsTable posts={posts ?? []} />
    </div>
  );
}
