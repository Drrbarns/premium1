import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ROLE_ROUTE_MAP: Record<string, string[]> = {
  admin: [],
  operations: ["/admin/staff", "/admin/settings"],
  documentation: ["/admin/staff", "/admin/settings", "/admin/inquiries"],
  customer_service: ["/admin/staff", "/admin/settings", "/admin/shipments"],
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (!path.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (process.env.ADMIN_AUTH_DISABLED === "true") {
    return NextResponse.next();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.redirect(new URL("/auth/admin?setup=1", request.url));
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/auth/admin", request.url));
  }

  // Role-based route protection
  if (path !== "/admin" && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { createClient } = await import("@supabase/supabase-js");
    const svc = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
    const { data: staffRow } = await svc
      .from("staff_users")
      .select("role")
      .eq("email", user.email || "")
      .single();

    const role = staffRow?.role || "admin";
    const blocked = ROLE_ROUTE_MAP[role] || [];
    if (blocked.some((r) => path.startsWith(r))) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
