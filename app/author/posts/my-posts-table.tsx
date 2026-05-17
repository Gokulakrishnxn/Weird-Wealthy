"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { MoreHorizontal, PenLine, Trash2, Globe, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  deletePostAction,
  publishPostAction,
  unpublishPostAction,
} from "@/app/actions/posts";
import { ConfirmDialog } from "@/components/cms/confirm-dialog";
import { PostStatusBadge } from "@/components/cms/post-status-badge";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { categoryList } from "@/lib/blog/categories";
import type { Post } from "@/lib/supabase/types";

export function MyPostsTable({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = filter === "all" ? posts : posts.filter((p) => p.status === filter);

  function handleStatusChange(post: Post, action: "publish" | "unpublish") {
    startTransition(async () => {
      const fn = action === "publish" ? publishPostAction : unpublishPostAction;
      const result = await fn(post.id);
      if (result?.error) toast.error(result.error);
      else toast.success(action === "publish" ? "Published!" : "Unpublished");
    });
  }

  return (
    <>
      <div className="flex gap-3">
        <Select value={filter} onValueChange={(v) => v != null && setFilter(v)}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All posts</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">No {filter !== "all" ? filter : ""} posts yet</p>
            {filter === "all" && (
              <Link href="/author/posts/new" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>
                Write your first post
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-elevated/40">
                  <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Title</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Category</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Updated</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((post) => (
                  <tr key={post.id} className="group hover:bg-elevated/30 transition-colors">
                    <td className="max-w-xs px-5 py-3.5">
                      <p className="truncate font-medium">{post.title}</p>
                      <p className="truncate text-xs text-muted-foreground">/{post.slug}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="capitalize text-xs">{post.category.replace("-", " ")}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <PostStatusBadge status={post.status as "draft" | "published" | "archived"} />
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{formatDate(post.updated_at)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex size-7 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem render={<Link href={`/author/posts/${post.id}/edit`} />}>
                            <PenLine className="size-3.5" /> Edit
                          </DropdownMenuItem>
                          {post.status === "published" && (
                            <DropdownMenuItem render={<a href={`/${post.slug}`} target="_blank" rel="noopener noreferrer" />}>
                              <Eye className="size-3.5" /> View live
                            </DropdownMenuItem>
                          )}
                          {post.status !== "published" ? (
                            <DropdownMenuItem onClick={() => handleStatusChange(post, "publish")} disabled={isPending}>
                              <Globe className="size-3.5" /> Publish
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleStatusChange(post, "unpublish")} disabled={isPending}>
                              <FileText className="size-3.5" /> Unpublish
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setDeleteId(post.id)}
                          >
                            <Trash2 className="size-3.5" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        title="Delete post?"
        description="This will permanently delete the post. This cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        onConfirm={async () => {
          if (!deleteId) return;
          const result = await deletePostAction(deleteId);
          if (result?.error) toast.error(result.error);
          else { toast.success("Post deleted"); setDeleteId(null); }
        }}
      />
    </>
  );
}
