import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EditAuthorForm } from "./edit-form";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("authors").select("name").eq("id", id).single();
  return { title: data ? `Edit ${data.name}` : "Edit Author" };
}

export default async function EditAuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: author } = await supabase
    .from("authors")
    .select("*")
    .eq("id", id)
    .single();

  if (!author) notFound();

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit author</h1>
        <p className="mt-1 text-sm text-muted-foreground">Update {author.name}'s profile and settings</p>
      </div>
      <div className="max-w-xl">
        <EditAuthorForm author={author} />
      </div>
    </div>
  );
}
