import type { Metadata } from "next";
import { CategoryEditor } from "./category-editor";

export const metadata: Metadata = { title: "Categories" };

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit category titles, descriptions, and banner images
        </p>
      </div>
      <CategoryEditor />
    </div>
  );
}
