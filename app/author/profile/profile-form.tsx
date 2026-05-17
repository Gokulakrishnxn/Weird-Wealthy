"use client";

import { useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { updateAuthorAction } from "@/app/actions/authors";
import { ImageUpload } from "@/components/cms/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import type { Author } from "@/lib/supabase/types";

export function ProfileForm({ author }: { author: Author }) {
  const [isPending, startTransition] = useTransition();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(author.avatar_url);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateAuthorAction(author.id, {
        name: fd.get("name") as string,
        bio: (fd.get("bio") as string) || null,
        avatar_url: avatarUrl,
        twitter_url: (fd.get("twitter") as string) || null,
        linkedin_url: (fd.get("linkedin") as string) || null,
        website_url: (fd.get("website") as string) || null,
      });
      if (result?.error) toast.error(result.error);
      else toast.success("Profile updated");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6">
      <div className="space-y-1.5">
        <Label>Profile picture</Label>
        <div className="w-28">
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

      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" defaultValue={author.name} required className="h-10" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          defaultValue={author.bio ?? ""}
          rows={4}
          placeholder="Tell readers a bit about yourself…"
          className="resize-none text-sm"
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-sm font-medium text-muted-foreground">Social links</p>
        {[
          { id: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/…", value: author.twitter_url ?? "" },
          { id: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/…", value: author.linkedin_url ?? "" },
          { id: "website", label: "Website", placeholder: "https://yoursite.com", value: author.website_url ?? "" },
        ].map((f) => (
          <div key={f.id} className="space-y-1.5">
            <Label htmlFor={f.id}>{f.label}</Label>
            <Input id={f.id} name={f.id} type="url" defaultValue={f.value} placeholder={f.placeholder} className="h-10" />
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full h-10" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Save profile
      </Button>
    </form>
  );
}
