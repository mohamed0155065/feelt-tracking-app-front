
import React from "react";

/**
 * Driver Application Layout
 *
 * This Server Component provides the application shell
 * for authenticated Driver users.
 *
 * Responsibilities:
 *
 * - Provides a dedicated layout for the Driver application.
 * - Prevents Admin Dashboard navigation from being displayed
 *   to Driver users.
 * - Keeps the Driver experience isolated from Admin UI.
 *
 * Relationship with the application:
 *
 * - The parent Server Layout determines the user's role.
 * - Driver users are rendered through this layout.
 * - The actual Driver Tracking feature is rendered as children.
 *
 * Authorization:
 *
 * - This component controls presentation only.
 * - Middleware protects the /tracking route.
 * - Backend authorization remains the final security boundary.
 */

export default function DriverLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main
            className="min-h-screen bg-[#080E21]"
            dir="rtl"
        >
            {children}
        </main>
    );
}