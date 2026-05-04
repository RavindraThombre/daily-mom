import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const isLoggedIn = !!token;

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/mom/daily-mom");

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/mom/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mom/daily-mom/:path*"],
};
