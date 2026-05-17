"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, SendHorizontal } from "lucide-react";
import { toast } from "sonner";
import { inviteAuthorAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function InviteAuthorForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [role, setRole] = useState("author");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("role", role);

    startTransition(async () => {
      const result = await inviteAuthorAction(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Invite sent successfully");
        router.push("/admin/authors");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6">
      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" placeholder="Jane Smith" required className="h-10" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" name="email" type="email" placeholder="jane@example.com" required className="h-10" />
      </div>

      <div className="space-y-1.5">
        <Label>Role</Label>
        <Select value={role} onValueChange={(v) => v != null && setRole(v)}>
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full h-10" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <SendHorizontal className="size-4" />}
        Send invite
      </Button>
    </form>
  );
}
