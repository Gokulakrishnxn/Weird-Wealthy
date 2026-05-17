"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { updateAuthorAction } from "@/app/actions/authors";
import { ImageUpload } from "@/components/cms/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import type { Author } from "@/lib/supabase/types";

export function EditAuthorForm({ author }: { author: Author }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(author.avatar_url);
  const [role, setRole] = useState(author.role);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateAuthorAction(author.id, {
        name: fd.get("name") as string,
        slug: fd.get("slug") as string,
        bio: (fd.get("bio") as string) || null,
        avatar_url: avatarUrl,
        twitter_url: (fd.get("twitter") as string) || null,
        linkedin_url: (fd.get("linkedin") as string) || null,
        website_url: (fd.get("website") as string) || null,
        role: role as "admin" | "author",
      });

      if (result?.error) toast.error(result.error);
      else { toast.success("Author updated"); router.push("/admin/authors"); }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6">
      {/* Avatar */}
      <div className="space-y-1.5">
        <Label>Profile picture</Label>
        <div className="w-32">
          <ImageUpload
            value={avatarUrl}
            onChange={setAvatarUrl}
            bucket="avatars"
            aspectRatio="1/1"
            label="Upload"
          />
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" defaultValue={author.name} required className="h-10" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="slug">URL slug</Label>
          <Input id="slug" name="slug" defaultValue={author.slug} required className="h-10 font-mono text-xs" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" defaultValue={author.bio ?? ""} rows={3} className="resize-none text-sm" />
      </div>

      <Separator />

      <div className="space-y-1.5">
        <Label>Role</Label>
        <Select value={role} onValueChange={(v) => v != null && setRole(v as "admin" | "author")}>
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-sm font-medium text-muted-foreground">Social links</p>
        {[
          { id: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/…", default: author.twitter_url ?? "" },
          { id: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/…", default: author.linkedin_url ?? "" },
          { id: "website", label: "Website", placeholder: "https://example.com", default: author.website_url ?? "" },
        ].map((field) => (
          <div key={field.id} className="space-y-1.5">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input id={field.id} name={field.id} type="url" defaultValue={field.default} placeholder={field.placeholder} className="h-10" />
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full h-10" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Save changes
      </Button>
    </form>
  );
}
