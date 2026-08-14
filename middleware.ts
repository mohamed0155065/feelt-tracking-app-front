import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { USER_ROLES, isUserRole } from "@/lib/auth/roles";

/**
 * Application Authorization Middleware
 *
 * Protects application routes based on authentication state
 * and the authenticated user's role.
 *
 * Responsibilities:
 *
 * - Protects authenticated application routes.
 * - Validates the presence of the authentication token.
 * - Validates that the stored role is a supported application role.
 * - Redirects Manager users to the Admin application.
 * - Redirects Driver users to the Driver application.
 * - Prevents authenticated users from returning to the login page.
 *
 * Relationship with the application:
 *
 * - The Login API communicates with the Backend and receives
 *   the authenticated user and their role.
 * - The Login API stores the authentication token and role
 *   in HttpOnly cookies.
 * - This middleware reads those cookies before protected
 *   routes are rendered.
 *
 * Security boundary:
 *
 * - The Backend remains the source of truth for authentication
 *   and authorization.
 * - The role cookie is used by the Frontend for route protection
 *   and navigation.
 * - Backend APIs must independently validate the authenticated
 *   user's permissions.
 */

const MANAGER_ROUTES = [
  "/dashboard",
  "/drivers",
  "/vehicles",
  "/history",
  "/tracking",
];

const DRIVER_ROUTES = [
  "/driver",
];

function matchesRoute(
  pathname: string,
  routes: readonly string[]
): boolean {
  return routes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const redirect = (path: string) =>
    NextResponse.redirect(
      new URL(path, request.url)
    );

  /*
   * -----------------------------------------
   * Login Route
   * -----------------------------------------
   *
   * The login page is public.
   *
   * If there is no authentication token,
   * the user is allowed to access /login.
   *
   * If the user is already authenticated,
   * they are redirected to the application
   * corresponding to their role.
   */

  if (pathname === "/login") {
    if (!token) {
      return NextResponse.next();
    }

    /*
     * A token exists but the role is missing
     * or invalid.
     *
     * This can happen when:
     *
     * - The user logged in before role cookies
     *   were introduced.
     * - The cookie was manually removed.
     * - The stored role is no longer supported.
     *
     * Instead of redirecting /login → /login forever,
     * clear the invalid session and allow the user
     * to authenticate again.
     */

    if (!isUserRole(role)) {
      const response = NextResponse.next();

      response.cookies.delete("token");
      response.cookies.delete("role");

      return response;
    }

    if (role === USER_ROLES.DRIVER) {
      return redirect("/driver");
    }

    return redirect("/dashboard");
  }

  /*
   * -----------------------------------------
   * Authentication
   * -----------------------------------------
   *
   * Every protected route requires an authentication token.
   */

  if (!token) {
    return redirect("/login");
  }

  /*
   * -----------------------------------------
   * Role Validation
   * -----------------------------------------
   *
   * The role comes from a runtime source (cookie),
   * so it must be validated before authorization decisions
   * are made.
   */

  if (!isUserRole(role)) {
    const response = redirect("/login");

    response.cookies.delete("token");
    response.cookies.delete("role");

    return response;
  }

  /*
   * -----------------------------------------
   * Manager Authorization
   * -----------------------------------------
   *
   * Manager routes are accessible only to Manager users.
   */

  if (matchesRoute(pathname, MANAGER_ROUTES)) {
    if (role !== USER_ROLES.MANAGER) {
      return redirect("/driver");
    }

    return NextResponse.next();
  }

  /*
   * -----------------------------------------
   * Driver Authorization
   * -----------------------------------------
   *
   * Driver routes are accessible only to Driver users.
   */

  if (matchesRoute(pathname, DRIVER_ROUTES)) {
    if (role !== USER_ROLES.DRIVER) {
      return redirect("/dashboard");
    }

    return NextResponse.next();
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
    "/driver/:path*",
  ],
};