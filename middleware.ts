import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;


  if (!token) {
    if (pathname === "/login") return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }


  let role: string;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    role = payload.role as string;
  } catch {

    return NextResponse.redirect(new URL("/login", request.url));
  }


  if (pathname === "/login") {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/dashboard" : "/tracking", request.url)
    );
  }


  if (pathname.startsWith("/dashboard") ||
    pathname.startsWith("/drivers") ||
    pathname.startsWith("/vehicles") ||
    pathname.startsWith("/history")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/tracking", request.url));
    }
  }

  if (pathname.startsWith("/tracking")) {
    if (role !== "driver") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/drivers/:path*",
    "/vehicles/:path*",
    "/history/:path*",
    "/tracking/:path*",
  ],
};