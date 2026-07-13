import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

type Role = "admin" | "driver";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

const secret = new TextEncoder().encode(jwtSecret);

const routePermissions: Record<Role, string[]> = {
  admin: ["/dashboard", "/drivers", "/vehicles", "/history"],
  driver: ["/tracking"],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const redirect = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));


  if (!token) {
    return pathname === "/login" ? NextResponse.next() : redirect("/login");
  }

  let role: Role;

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "admin" && payload.role !== "driver") {
      return redirect("/login");
    }

    role = payload.role;
  } catch {
    return redirect("/login");
  }


  if (pathname === "/login") {
    return redirect(role === "admin" ? "/dashboard" : "/tracking");
  }


  for (const [allowedRole, routes] of Object.entries(routePermissions) as [
    Role,
    string[]
  ][]) {
    const isProtectedRoute = routes.some((route) =>
      pathname === route || pathname.startsWith(route + "/")
    );

    if (isProtectedRoute && role !== allowedRole) {
      return redirect(role === "admin" ? "/dashboard" : "/tracking");
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