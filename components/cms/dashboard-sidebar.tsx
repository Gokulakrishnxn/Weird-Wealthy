"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  PenLine,
  Settings,
  Tags,
  User,
  Users,
  X,
} from "lucide-react";
import type { Author } from "@/lib/supabase/types";
import { logoutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const adminNav: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Authors", href: "/admin/authors", icon: Users },
  { label: "Posts", href: "/admin/posts", icon: BookOpen },
  { label: "Categories", href: "/admin/categories", icon: Tags },
];

const authorNav: NavItem[] = [
  { label: "Overview", href: "/author", icon: LayoutDashboard },
  { label: "My Posts", href: "/author/posts", icon: PenLine },
  { label: "Profile", href: "/author/profile", icon: User },
];

function NavLink({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
        active
          ? "bg-inverse text-inverse-foreground"
          : "text-muted-foreground hover:bg-elevated hover:text-foreground"
      )}
    >
      <Icon className="size-4 shrink-0" />
      {item.label}
    </Link>
  );
}

function SidebarContent({
  author,
  role,
  onClose,
}: {
  author: Author;
  role: "admin" | "author";
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const nav = role === "admin" ? adminNav : authorNav;

  function isActive(href: string) {
    if (href === "/admin" || href === "/author") return pathname === href;
    return pathname.startsWith(href);
  }

  function handleLogout() {
    startTransition(() => logoutAction());
  }

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-inverse text-inverse-foreground">
          <span className="font-logo text-sm font-bold">W</span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Weird & Wealthy</p>
          <p className="truncate text-xs capitalize text-muted-foreground">{role} panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {nav.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={isActive(item.href)}
            onClick={onClose}
          />
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5">
          {author.avatar_url ? (
            <img
              src={author.avatar_url}
              alt={author.name}
              className="size-7 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-7 items-center justify-center rounded-full bg-inverse text-xs font-semibold text-inverse-foreground">
              {author.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{author.name}</p>
            <p className="truncate text-xs text-muted-foreground capitalize">{author.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground disabled:opacity-50"
        >
          <LogOut className="size-4 shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  );
}

export function DashboardSidebar({ author, role }: { author: Author; role: "admin" | "author" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger */}
      <button
        className="fixed left-4 top-4 z-50 flex size-10 items-center justify-center rounded-xl border border-border bg-background shadow-sm lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </button>

      {/* Mobile sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-sidebar">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarContent author={author} role={role} onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
        <SidebarContent author={author} role={role} />
      </aside>
    </>
  );
}
