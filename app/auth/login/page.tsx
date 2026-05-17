import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo mark */}
        <div className="space-y-2 text-center">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-inverse text-inverse-foreground">
            <span className="font-logo text-lg font-bold tracking-tight">W</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to your dashboard</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
