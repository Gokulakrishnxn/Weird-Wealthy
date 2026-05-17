"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/cms/image-upload";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { categoryList } from "@/lib/blog/categories";
import type { CategoryMeta } from "@/lib/blog/categories";

export function CategoryEditor() {
  const [categories, setCategories] = useState<CategoryMeta[]>(categoryList);

  function update(id: string, field: keyof CategoryMeta, value: string) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.id} className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-3">
            <Badge variant="outline" className="text-xs">{cat.id}</Badge>
            <span className="font-semibold">{cat.label}</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Left col */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Page title</Label>
                <Input
                  value={cat.title}
                  onChange={(e) => update(cat.id, "title", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Tagline</Label>
                <Input
                  value={cat.tagline}
                  onChange={(e) => update(cat.id, "tagline", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea
                  value={cat.description}
                  onChange={(e) => update(cat.id, "description", e.target.value)}
                  rows={3}
                  className="resize-none text-sm"
                />
              </div>
            </div>

            {/* Banner image */}
            <div className="space-y-1.5">
              <Label>Banner image</Label>
              <ImageUpload
                value={cat.image.startsWith("http") ? cat.image : null}
                onChange={(url) => update(cat.id, "image", url ?? cat.image)}
                bucket="post-images"
                aspectRatio="16/9"
                label="Upload banner"
              />
              <p className="text-xs text-muted-foreground">
                Current: {cat.image.length > 40 ? `…${cat.image.slice(-30)}` : cat.image}
              </p>
            </div>
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground text-center pb-4">
        Note: Category edits are preview-only until persisted to the database via a migration.
      </p>
    </div>
  );
}
