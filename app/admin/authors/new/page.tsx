import type { Metadata } from "next";
import { InviteAuthorForm } from "./invite-form";

export const metadata: Metadata = { title: "Invite Author" };

export default function InviteAuthorPage() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Invite author</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          An email invite will be sent. They'll set their own password on first sign-in.
        </p>
      </div>
      <div className="max-w-lg">
        <InviteAuthorForm />
      </div>
    </div>
  );
}
