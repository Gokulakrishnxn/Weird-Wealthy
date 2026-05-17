import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { PREVIEW_AUTHOR } from "@/lib/supabase/preview";
import { getCurrentAuthor } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "My Profile", robots: { index: false } };

export default async function ProfilePage() {
  const author = isSupabaseConfigured()
    ? await getCurrentAuthor()
    : PREVIEW_AUTHOR;
  if (!author) return null;

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Update your public author information</p>
      </div>
      <div className="max-w-xl">
        <ProfileForm author={author} />
      </div>
    </div>
  );
}
