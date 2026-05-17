import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuthorsTable } from "./authors-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminAuthorsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: authors } = await supabase
    .from("authors")
    .select("*, posts(count)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Authors</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your publication's writers</p>
        </div>
        <Link href="/admin/authors/new" className={cn(buttonVariants())}>
          <Plus className="size-4" />
          Invite author
        </Link>
      </div>

      <AuthorsTable authors={authors ?? []} />
    </div>
  );
}
