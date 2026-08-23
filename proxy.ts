import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request,
  });

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isAuthRoute = pathname === "/login" || pathname === "/signup";

  const isProtectedRoute =
    pathname === "/panel" || pathname.startsWith("/panel/");

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();

    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();

    url.pathname = "/panel";

    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/login", "/signup", "/panel/:path*"],
};
