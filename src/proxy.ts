import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !request.auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/login") && request.auth) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
