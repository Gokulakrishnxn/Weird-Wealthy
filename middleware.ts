import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdmin = matchesPrefix(pathname, "/admin");
  const isAuthor = matchesPrefix(pathname, "/author");
  const isPreview = matchesPrefix(pathname, "/preview");
  const isAuthRoute = matchesPrefix(pathname, "/auth");
  const isProtected = isAdmin || isAuthor || isPreview;

  if (!isSupabaseConfigured()) {
    if (isProtected) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let author: { role: string; is_active: boolean } | null = null;

  if (user) {
    const { data } = await supabase
      .from("authors")
      .select("role, is_active")
      .eq("user_id", user.id)
      .maybeSingle();
    author = data;
  }

  // Unauthenticated — redirect to login
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (user) {
    // Signed in but no author row — stay on login (avoid /auth ↔ /author loop)
    if (isAuthRoute) {
      if (!author) {
        return supabaseResponse;
      }
      const dest = author.role === "admin" ? "/admin" : "/author";
      return NextResponse.redirect(new URL(dest, request.url));
    }

    // Dashboard routes require an author profile
    if (isProtected && !author) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("error", "no-profile");
      return NextResponse.redirect(url);
    }

    if (isAdmin && author && author.role !== "admin") {
      return NextResponse.redirect(new URL("/author", request.url));
    }

    if ((isAdmin || isAuthor) && author?.is_active === false) {
      return NextResponse.redirect(
        new URL("/auth/login?error=deactivated", request.url)
      );
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|icon.*\\.png|apple-icon.*|sw\\.js|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|offline|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
