"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { MoreHorizontal, PenLine, Trash2, Globe, FileText, Archive } from "lucide-react";
import { toast } from "sonner";
import {
  deletePostAction,
  publishPostAction,
  unpublishPostAction,
  archivePostAction,
} from "@/app/actions/posts";
import { ConfirmDialog } from "@/components/cms/confirm-dialog";
import { PostStatusBadge } from "@/components/cms/post-status-badge";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { categoryList } from "@/lib/blog/categories";
import type { Post } from "@/lib/supabase/types";

type PostWithAuthor = Post & { authors: { id: string; name: string; slug: string } | null };

interface AdminPostsTableProps {
  posts: PostWithAuthor[];
  authors: { id: string; name: string }[];
}

export function AdminPostsTable({ posts, authors }: AdminPostsTableProps) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterAuthor, setFilterAuthor] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = posts.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory !== "all" && p.category !== filterCategory) return false;
    if (filterAuthor !== "all" && p.authors?.id !== filterAuthor) return false;
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    return true;
  });

  function handleStatusChange(post: PostWithAuthor, action: "publish" | "unpublish" | "archive") {
    startTransition(async () => {
      let result;
      if (action === "publish") result = await publishPostAction(post.id);
      else if (action === "unpublish") result = await unpublishPostAction(post.id);
      else result = await archivePostAction(post.id);

      if (result?.error) toast.error(result.error);
      else toast.success("Post updated");
    });
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search posts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full max-w-xs"
        />
        <Select value={filterStatus} onValueChange={(v) => v != null && setFilterStatus(v)}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={(v) => v != null && setFilterCategory(v)}>
          <SelectTrigger className="h-9 w-44">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categoryList.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterAuthor} onValueChange={(v) => v != null && setFilterAuthor(v)}>
          <SelectTrigger className="h-9 w-44">
            <SelectValue placeholder="All authors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All authors</SelectItem>
            {authors.map((a) => (
              <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">No posts match your filters</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-elevated/40">
                  <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Post</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Author</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Category</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
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
                    <td className="px-5 py-3.5 text-muted-foreground">{post.authors?.name ?? "—"}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="capitalize text-xs">{post.category.replace("-", " ")}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <PostStatusBadge status={post.status as "draft" | "published" | "archived"} />
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{formatDate(post.created_at)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex size-7 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem render={<Link href={`/author/posts/${post.id}/edit`} />}>
                            <PenLine className="size-3.5" /> Edit post
                          </DropdownMenuItem>
                          {post.status !== "published" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(post, "publish")} disabled={isPending}>
                              <Globe className="size-3.5" /> Publish
                            </DropdownMenuItem>
                          )}
                          {post.status === "published" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(post, "unpublish")} disabled={isPending}>
                              <FileText className="size-3.5" /> Unpublish
                            </DropdownMenuItem>
                          )}
                          {post.status !== "archived" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(post, "archive")} disabled={isPending}>
                              <Archive className="size-3.5" /> Archive
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
          )}
        </div>
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
    </div>
  );
}
