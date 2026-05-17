"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadImageAction } from "@/app/actions/upload";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  bucket?: "post-images" | "avatars";
  aspectRatio?: "16/9" | "1/1";
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  bucket = "post-images",
  aspectRatio = "16/9",
  label = "Upload image",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB");
      return;
    }
    setError(null);
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImageAction(formData, bucket);
    setUploading(false);
    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      onChange(result.url);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-border bg-elevated">
          <img
            src={value}
            alt="Preview"
            className={cn(
              "w-full object-cover",
              aspectRatio === "16/9" ? "aspect-video" : "aspect-square"
            )}
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          disabled={uploading}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-elevated/50 text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground disabled:opacity-50",
            aspectRatio === "16/9" ? "aspect-video" : "aspect-square"
          )}
        >
          {uploading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <>
              <ImagePlus className="size-6" />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs opacity-70">Drag & drop or click to browse</span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
