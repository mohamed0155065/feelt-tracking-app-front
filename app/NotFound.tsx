import Link from "next/link";

import { Home, SearchX } from "lucide-react";

/**
 * Dashboard Not Found
 *
 * Displays a fallback page when the requested
 * dashboard route does not exist.
 *
 * Responsibilities:
 * - Informs the user that the page was not found.
 * - Provides a navigation action back to the Dashboard.
 *
 * Relationship with the application:
 * - Automatically rendered by Next.js App Router.
 * - Used when a dashboard route cannot be matched.
 */
export default function NotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center p-8">
            <div
                className="
          mb-6 flex h-24 w-24
          items-center justify-center
          rounded-full
          bg-blue-500/10
        "
            >
                <SearchX className="h-12 w-12 text-blue-400" />
            </div>

            <h1 className="mb-2 text-3xl font-bold text-white">
                Page Not Found
            </h1>

            <p className="mb-8 max-w-md text-center text-gray-400">
                The page you are looking for does not exist or has been moved.
            </p>

            <Link
                href="/dashboard"
                className="
          flex items-center gap-2
          rounded-xl
          bg-blue-500
          px-6 py-3
          font-medium text-white
          transition-colors
          hover:bg-blue-600
        "
            >
                <Home className="h-4 w-4" />

                <span>Back to Dashboard</span>
            </Link>
        </div>
    );
}