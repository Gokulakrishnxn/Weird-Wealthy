import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdmin = pathname.startsWith("/admin");
  const isAuthor = pathname.startsWith("/author");
  const isPreview = pathname.startsWith("/preview");
  const isAuthRoute = pathname.startsWith("/auth");
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

  // Refresh session — must be called before reading user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Unauthenticated — redirect to login
  if (!user && (isAdmin || isAuthor || isPreview)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (user) {
    const { data: author } = await supabase
      .from("authors")
      .select("role, is_active")
      .eq("user_id", user.id)
      .single();

    // Authenticated + visiting login → send to correct dashboard
    if (isAuthRoute) {
      const dest = author?.role === "admin" ? "/admin" : "/author";
      return NextResponse.redirect(new URL(dest, request.url));
    }

    // Only admins may access /admin routes
    if (isAdmin && author?.role !== "admin") {
      return NextResponse.redirect(new URL("/author", request.url));
    }

    // Deactivated authors cannot access dashboards
    if ((isAdmin || isAuthor) && author?.is_active === false) {
      return NextResponse.redirect(new URL("/auth/login?error=deactivated", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|icon.*\\.png|apple-icon.*|sw\\.js|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|offline|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
