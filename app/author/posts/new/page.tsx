import type { Metadata } from "next";
import { getCurrentAuthor } from "@/lib/supabase/server";
import { PostEditor } from "@/components/cms/post-editor";

export const metadata: Metadata = {
  title: "New Post",
  robots: { index: false },
};

export default async function NewPostPage() {
  const author = await getCurrentAuthor();
  if (!author) return null;

  return (
    <div className="flex h-full flex-col">
      <PostEditor authorId={author.id} />
    </div>
  );
}
