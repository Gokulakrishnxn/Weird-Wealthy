"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function uploadImageAction(formData: FormData, bucket: "post-images" | "avatars") {
  const supabase = await createSupabaseServerClient();
  const file = formData.get("file") as File;

  if (!file || !file.size) return { error: "No file provided" };

  const ext = file.name.split(".").pop() ?? "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { contentType: file.type, upsert: false });

  if (error) return { error: error.message };

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return { url: publicUrl };
}
