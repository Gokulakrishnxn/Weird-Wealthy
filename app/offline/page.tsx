import Link from "next/link";
import { pageContainer } from "@/lib/layout";

export const metadata = {
  title: "Offline",
};

export default function OfflinePage() {
  return (
    <div className={pageContainer}>
      <div className="mx-auto flex min-h-[50dvh] max-w-md flex-col items-center justify-center py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">You&apos;re offline</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Reconnect to browse Weird &amp; Wealthy. Cached pages may still be
          available when you return online.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-inverse px-6 text-sm font-medium text-inverse-foreground"
        >
          Try again
        </Link>
      </div>
    </div>
  );
}
