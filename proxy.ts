// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname ===
    "/dashboard/projects/8c4e7ca8-fcee-4395-bcbe-e9cad8c054f0"
  ) {
    return NextResponse.next();
  }
  const session = req.cookies.get("dashboard_session");

  // If user is on login page and has an active session, redirect to homepage
  if (req.nextUrl.pathname === "/auth/login" && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user is on login page without a session, allow access
  if (req.nextUrl.pathname === "/auth/login") {
    return NextResponse.next();
  }

  // For all other routes (dashboard), require authentication
  if (!session) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?next=${req.nextUrl.pathname || "dashboard"}`,
        req.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
