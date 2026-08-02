/**
 * Logout Button
 *
 * Client component responsible for signing the user out.
 *
 * Responsibilities:
 * - Handles the logout action.
 * - Redirects the user to the login page.
 *
 * Relationship with the application:
 * - Used by the Navbar.
 * - Navigates using the Next.js App Router.
 * - Refreshes the application after logout.
 */

"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();

    function handleLogout() {
        /**
         * TODO:
         * Replace this with a server-side logout endpoint
         * that clears the authentication cookie.
         */

        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        router.push("/login");

        router.refresh();
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="
        flex items-center gap-2
        rounded-lg
        px-4 py-2
        text-sm text-red-400
        transition-all
        hover:bg-red-500/10
        hover:text-red-300
      "
        >
            <LogOut className="h-4 w-4" />

            <span>تسجيل الخروج</span>
        </button>
    );
}