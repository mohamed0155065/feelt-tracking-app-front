
import Pick from "typescript";
import { Home, Users, Truck, MapPinned } from "lucide-react";

import { SidebarNavLink } from "./SidebarNavLink";
import { SidebarToggle } from "./SidebarToggle";
import type { User } from "@/GlobalTypes/User.types";

interface SidebarProps {
    user: Pick<User, "name" | "email">;
}

const navItems = [
    {
        href: "/dashboard",
        label: "لوحة التحكم",
        icon: Home,
    },
    {
        href: "/drivers",
        label: "السائقين",
        icon: Users,
    },
    {
        href: "/vehicles",
        label: "المركبات",
        icon: Truck,
    },
    {
        href: "/history",
        label: "سجل المسارات",
        icon: MapPinned,
    },
] as const;

/**
 * Sidebar — Shared Layout Component
 *
 * Why it is not inside features/:
 * - It is not tied to a business domain.
 * - It is reused across all dashboard pages.
 * - It belongs to the app shell / layout layer.
 *
 * Why it can stay a Server Component:
 * - It renders static navigation and user data.
 * - The only interactive part is delegated to SidebarToggle.
 * - This keeps the main shell lean and server-rendered.
 */
export function Sidebar({ user }: SidebarProps) {
    const initial = user.name?.trim()?.[0]?.toUpperCase() ?? "?";

    return (
        <aside
            className="flex h-screen w-64 flex-col border-l border-white/5 bg-[#111827]"
            aria-label="Sidebar navigation"
        >
            {/* Logo */}
            <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                    <span className="text-sm font-bold text-white">F</span>
                </div>
                <span className="text-lg font-bold text-white">FleetTrack</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-4 py-6" aria-label="Primary">
                {navItems.map((item) => (
                    <SidebarNavLink
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                    >
                        {item.label}
                    </SidebarNavLink>
                ))}
            </nav>

            {/* User Info */}
            <div className="border-t border-white/5 px-4 py-4">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20"
                        aria-hidden="true"
                    >
                        <span className="font-bold text-blue-400">{initial}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">
                            {user.name}
                        </p>
                        <p className="truncate text-xs text-gray-400">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* Mobile Toggle (Client Component) */}
            <SidebarToggle />
        </aside>
    );
}

