import { redirect } from "next/navigation";
import { getCurrentAuthor } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/cms/dashboard-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default async function AuthorLayout({ children }: { children: React.ReactNode }) {
  const author = await getCurrentAuthor();

  if (!author) redirect("/auth/login");
  if (!author.is_active) redirect("/auth/login?error=deactivated");

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <DashboardSidebar author={author} role={author.role as "admin" | "author"} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
