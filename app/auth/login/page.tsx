import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";
import { logoutAction } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false },
};

const loginErrors: Record<string, string> = {
  deactivated:
    "Your author account is deactivated. Contact hello@weirdandwealthy.com for help.",
  "no-profile":
    "You are signed in, but no author profile is linked to this account yet. Ask an admin to invite you, or sign out below.",
  callback: "Sign-in could not be completed. Please try again.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message = error ? loginErrors[error] : null;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-inverse text-inverse-foreground">
            <span className="font-logo text-lg font-bold tracking-tight">W</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to your dashboard
            </p>
          </div>
        </div>

        {message && (
          <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {message}
          </p>
        )}

        <LoginForm />

        <div className="flex flex-col items-center gap-3 text-center text-sm">
          {error === "no-profile" && (
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Sign out
              </button>
            </form>
          )}
          <Link
            href="/"
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Back to journal
          </Link>
        </div>
      </div>
    </div>
  );
}
