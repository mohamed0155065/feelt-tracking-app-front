import React from "react";
import { cookies } from "next/headers";

import DashboardLayoutClient from "./DashboardLayoutClient";
import DriverLayout from "./DriverLayout";
import { isUserRole } from "@/lib/auth/roles";

/**
 * Dashboard Route Layout
 *
 * This Server Component is responsible for determining
 * which application shell should be rendered based on
 * the authenticated user's role.
 *
 * Responsibilities:
 *
 * - Reads the authenticated user's role from the HttpOnly cookie.
 * - Keeps the role inaccessible to client-side JavaScript.
 * - Selects the correct application shell for the current user.
 * - Renders the Admin Dashboard for Manager users.
 * - Renders the Driver application for Driver users.
 *
 * Relationship with the application:
 *
 * - The Login API stores the authenticated user's role
 *   inside an HttpOnly cookie.
 * - This Server Component reads that cookie on the server.
 * - DashboardLayoutClient handles client-side interactions
 *   such as navigation and logout.
 * - Middleware independently protects the routes.
 *
 * Security:
 *
 * - The role is not read from localStorage.
 * - The role is not read from document.cookie.
 * - The HttpOnly cookie cannot be accessed by client-side JavaScript.
 * - The Backend remains the final authorization boundary.
 */

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const role = cookieStore.get("role")?.value;

  /*
   * If the role is missing or invalid, the middleware
   * should normally handle the request before reaching
   * this layout.
   *
   * We still validate it here because values coming from
   * cookies are runtime data and should never be blindly trusted.
   */
  if (!isUserRole(role)) {
    return <>{children}</>;
  }

  /*
   * Driver users should get the Driver application shell
   * instead of the Admin Dashboard shell.
   */
  if (role === "driver") {
    return <DriverLayout>{children}</DriverLayout>;
  }

  /*
   * Manager users receive the normal Admin Dashboard shell.
   */
  return (
    <DashboardLayoutClient>
      {children}
    </DashboardLayoutClient>
  );
}