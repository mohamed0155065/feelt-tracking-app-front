"use client";

import { useEffect } from "react";

import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Dashboard Error Boundary
 *
 * Client component responsible for displaying a fallback UI
 * whenever an unexpected runtime error occurs.
 *
 * Responsibilities:
 * - Displays an error message.
 * - Logs the error during development.
 * - Allows the user to retry rendering.
 *
 * Relationship with the application:
 * - Used by the Dashboard route.
 * - Receives the error from Next.js.
 * - Calls reset() to retry rendering.
 */
interface ErrorBoundaryProps {
    error: Error & {
        digest?: string;
    };

    reset: () => void;
}

export default function ErrorBoundary({
    error,
    reset,
}: ErrorBoundaryProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-full flex-col items-center justify-center p-8">
            <div
                className="
          mb-4 flex h-16 w-16
          items-center justify-center
          rounded-full
          bg-red-500/10
        "
            >
                <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>

            <h2 className="mb-2 text-xl font-bold text-white">
                Something went wrong
            </h2>

            <p className="mb-6 max-w-md text-center text-gray-400">
                An unexpected error occurred while loading this page.
            </p>

            {process.env.NODE_ENV === "development" && (
                <div
                    className="
            mb-6 max-w-lg overflow-auto
            rounded-lg bg-gray-800 p-4
          "
                >
                    <p className="font-mono text-sm text-red-400">
                        {error.message}
                    </p>
                </div>
            )}

            <button
                type="button"
                onClick={reset}
                className="
          flex items-center gap-2
          rounded-xl bg-blue-500
          px-6 py-3
          font-medium text-white
          transition-colors
          hover:bg-blue-600
        "
            >
                <RefreshCw className="h-4 w-4" />

                <span>Try Again</span>
            </button>
        </div>
    );
}