"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import { Loader2, Save, Eye, Globe, Archive } from "lucide-react";
import { toast } from "sonner";
import { createPostAction, updatePostAction, publishPostAction, unpublishPostAction, archivePostAction } from "@/app/actions/posts";
import { EditorToolbar } from "./editor-toolbar";
import { ImageUpload } from "./image-upload";
import { PostStatusBadge } from "./post-status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { Post } from "@/lib/supabase/types";
import { categoryList } from "@/lib/blog/categories";

interface PostEditorProps {
  post?: Post;
  authorId: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function PostEditor({ post, authorId }: PostEditorProps) {
  const router = useRouter();
  const isEditing = !!post;

  const [postId, setPostId] = useState<string | null>(post?.id ?? null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(isEditing);
  const [description, setDescription] = useState(post?.description ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(post?.image_url ?? null);
  const [status, setStatus] = useState<"draft" | "published" | "archived">(post?.status ?? "draft");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const autoSaveTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-link underline" } }),
      ImageExtension.configure({ HTMLAttributes: { class: "rounded-xl max-w-full" } }),
      Placeholder.configure({ placeholder: "Start writing your story…" }),
      CharacterCount,
    ],
    content: (post?.content ?? "") as string,
    editorProps: {
      attributes: {
        class: "prose prose-neutral dark:prose-invert max-w-none min-h-[400px] px-6 py-5 focus:outline-none text-foreground",
      },
    },
    onUpdate: () => scheduleAutoSave(),
  });

  // Sync slug from title when not manually edited
  useEffect(() => {
    if (!slugEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, slugEdited]);

  function scheduleAutoSave() {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => autoSave(), 30_000);
  }

  useEffect(() => {
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, []);

  async function autoSave() {
    if (!title.trim() || !category) return;
    await savePost("draft", true);
  }

  async function savePost(targetStatus?: "draft" | "published" | "archived", silent = false) {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!category) {
      toast.error("Category is required");
      return;
    }

    if (!silent) setSaving(true);

    const html = editor?.getHTML() ?? "";
    const content = editor?.getJSON() ?? null;
    const finalStatus = targetStatus ?? status;
    const publishedAt =
      finalStatus === "published" && status !== "published"
        ? new Date().toISOString()
        : post?.published_at ?? null;

    const payload = {
      slug,
      title: title.trim(),
      description: description.trim() || null,
      content,
      content_html: html,
      category,
      image_url: imageUrl,
      status: finalStatus,
      published_at: publishedAt,
    };

    if (postId) {
      const result = await updatePostAction(postId, payload);
      if (result?.error) {
        if (!silent) toast.error(result.error);
      } else {
        setStatus(finalStatus);
        if (!silent) toast.success("Saved");
      }
    } else {
      const result = await createPostAction(payload);
      if (result?.error) {
        if (!silent) toast.error(result.error);
      } else if (result?.id) {
        setPostId(result.id);
        setStatus(finalStatus);
        if (!silent) toast.success("Post created");
        router.replace(`/author/posts/${result.id}/edit`);
      }
    }

    if (!silent) setSaving(false);
  }

  async function handlePublishToggle() {
    if (!postId) {
      await savePost("published");
      return;
    }
    setPublishing(true);
    if (status === "published") {
      const result = await unpublishPostAction(postId);
      if (result?.error) toast.error(result.error);
      else { setStatus("draft"); toast.success("Unpublished"); }
    } else {
      const result = await publishPostAction(postId);
      if (result?.error) toast.error(result.error);
      else { setStatus("published"); toast.success("Published!"); }
    }
    setPublishing(false);
  }

  function handleImageInsert() {
    const url = window.prompt("Enter image URL:");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }

  const wordCount = editor?.storage.characterCount?.words() ?? 0;

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <PostStatusBadge status={status} />
          <span className="hidden text-xs text-muted-foreground sm:inline">{wordCount} words</span>
        </div>
        <div className="flex items-center gap-2">
          {postId && (
            <a
              href={`/preview/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <Eye className="size-3.5" />
              Preview
            </a>
          )}
          <Button variant="outline" size="sm" onClick={() => savePost()} disabled={saving}>
            {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
            Save draft
          </Button>
          <Button size="sm" onClick={handlePublishToggle} disabled={publishing}>
            {publishing ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Globe className="size-3.5" />
            )}
            {status === "published" ? "Unpublish" : "Publish"}
          </Button>
        </div>
      </div>

      {/* Main editor + sidebar */}
      <div className="flex min-h-0 flex-1">
        {/* Editor */}
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          {/* Title */}
          <div className="border-b border-border px-6 py-5">
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title…"
              className="w-full resize-none bg-transparent text-3xl font-semibold tracking-tight placeholder:text-muted-foreground/50 focus:outline-none lg:text-4xl"
              rows={2}
            />
          </div>

          {/* Toolbar + content */}
          {editor && (
            <>
              <div className="border-b border-border px-4 py-2">
                <EditorToolbar editor={editor} onImageInsert={handleImageInsert} />
              </div>
              <EditorContent editor={editor} className="flex-1" />
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 overflow-y-auto border-l border-border bg-card xl:block">
          <div className="space-y-6 p-5">
            {/* Slug */}
            <div className="space-y-1.5">
              <Label>URL Slug</Label>
              <Input
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
                placeholder="post-url-slug"
                className="font-mono text-xs"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short excerpt shown on cards…"
                rows={3}
                className="resize-none text-sm"
              />
            </div>

            <Separator />

            {/* Category */}
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => v != null && setCategory(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryList.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Card image */}
            <div className="space-y-1.5">
              <Label>Card image</Label>
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                bucket="post-images"
                aspectRatio="16/9"
                label="Upload card image"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
