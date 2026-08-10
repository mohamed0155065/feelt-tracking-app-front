/**
 * Navbar
 *
 * Server component responsible for rendering the dashboard header.
 *
 * Responsibilities:
 * - Displays the current user's information.
 * - Displays the connection status.
 * - Displays dashboard actions.
 *
 * Relationship with the application:
 * - Receives the authenticated user from the Layout.
 * - Renders the ConnectionStatus component.
 * - Renders the LogoutButton component.
 */

import ConnectionStatus from "../../dashboard/";
import { LogoutButton } from "../logout-button";

import { User } from "@/lib/types";

interface NavbarProps {
    user: User;
}

export function Navbar({ user }: NavbarProps) {
    return (
        <header
            className="
        flex h-16 items-center justify-between
        border-b border-white/5
        bg-[#111827]/80
        px-6
        backdrop-blur-xl
      "
        >
            <div>
                <h1 className="font-semibold text-white">
                    لوحة التحكم
                </h1>

                <p className="text-xs text-gray-400">
                    مرحباً، {user.name}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <ConnectionStatus />

                <button
                    type="button"
                    aria-label="Notifications"
                    className="
            relative
            p-2
            text-gray-400
            transition-colors
            hover:text-white
          "
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 17h5l-1.405-1.405A2.032
              2.032 0 0118 14.158V11a6.002
              6.002 0 00-4-5.659V5a2
              2 0 10-4 0v.341C7.67
              6.165 6 8.388 6 11v3.159c0
              .538-.214 1.055-.595
              1.436L4 17h5m6 0v1a3
              3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>

                    <span
                        className="
              absolute right-1 top-1
              h-2 w-2 rounded-full
              bg-red-500
            "
                    />
                </button>

                <LogoutButton />
            </div>
        </header>
    );
}