"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { MoreHorizontal, PenLine, ShieldOff, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { activateAuthorAction, deactivateAuthorAction, deleteAuthorAction } from "@/app/actions/authors";
import { ConfirmDialog } from "@/components/cms/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import type { Author } from "@/lib/supabase/types";

type AuthorWithCount = Author & { posts: { count: number }[] };

export function AuthorsTable({ authors }: { authors: AuthorWithCount[] }) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggleActive(author: Author) {
    startTransition(async () => {
      const fn = author.is_active ? deactivateAuthorAction : activateAuthorAction;
      const result = await fn(author.id);
      if (result?.error) toast.error(result.error);
      else toast.success(author.is_active ? "Author deactivated" : "Author activated");
    });
  }

  if (authors.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card py-16 text-center">
        <p className="text-sm text-muted-foreground">No authors yet. Invite your first writer.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-elevated/40">
                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Author</th>
                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Role</th>
                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Posts</th>
                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-muted-foreground">Joined</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {authors.map((author) => {
                const postCount = author.posts?.[0]?.count ?? 0;
                return (
                  <tr key={author.id} className="group hover:bg-elevated/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {author.avatar_url ? (
                          <img src={author.avatar_url} alt={author.name} className="size-8 rounded-full object-cover" />
                        ) : (
                          <div className="flex size-8 items-center justify-center rounded-full bg-inverse text-xs font-semibold text-inverse-foreground">
                            {author.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{author.name}</p>
                          <p className="text-xs text-muted-foreground">/{author.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="capitalize text-xs">
                        {author.role}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{postCount}</td>
                    <td className="px-5 py-3.5">
                      <Badge
                        variant="outline"
                        className={
                          author.is_active
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {author.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{formatDate(author.created_at)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex size-7 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem render={<Link href={`/admin/authors/${author.id}`} />}>
                            <PenLine className="size-3.5" />
                            Edit profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleActive(author)} disabled={isPending}>
                            {author.is_active ? (
                              <><ShieldOff className="size-3.5" /> Deactivate</>
                            ) : (
                              <><ShieldCheck className="size-3.5" /> Activate</>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setDeleteId(author.id)}
                          >
                            <Trash2 className="size-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        title="Delete author?"
        description="This will permanently delete the author and archive all their posts. This cannot be undone."
        confirmLabel="Delete author"
        variant="destructive"
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        onConfirm={async () => {
          if (!deleteId) return;
          const result = await deleteAuthorAction(deleteId);
          if (result?.error) toast.error(result.error);
          else { toast.success("Author deleted"); setDeleteId(null); }
        }}
      />
    </>
  );
}
