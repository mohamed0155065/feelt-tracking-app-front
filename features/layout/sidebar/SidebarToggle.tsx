
"use client";

import { Menu, X } from "lucide-react";

import { useDashboardStore } from "../../dashboard/store/useDashboardStore";

/**
 * SidebarToggle — Client Component
 *
 * Uses Zustand to toggle the dashboard sidebar on mobile screens.
 * This component is intentionally small so it has minimal bundle impact.
 */
export function SidebarToggle() {
    const sidebarOpen = useDashboardStore((state) => state.sidebarOpen);
    const toggleSidebar = useDashboardStore((state) => state.toggleSidebar);

    return (
        <button
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={sidebarOpen}
            aria-controls="dashboard-sidebar"
            className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827] lg:hidden"
        >
            {sidebarOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
            ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
            )}
        </button>
    );
}

