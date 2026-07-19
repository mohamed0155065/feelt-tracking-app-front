import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  console.log("Path:", pathname);
  console.log("Token:", token);
  const redirect = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));


  if (!token) {
    if (pathname === "/login") {
      return NextResponse.next();
    }

    return redirect("/login");
  }


  if (pathname === "/login") {
    return redirect("/dashboard");
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