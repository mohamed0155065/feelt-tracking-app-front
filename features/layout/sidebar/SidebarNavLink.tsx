
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarNavLinkProps {
    href: string;
    icon: LucideIcon;
    children: React.ReactNode;
}

/**
 * SidebarNavLink — Client Component
 *
 * Why it must be a Client Component:
 * - Uses `usePathname()` from `next/navigation`
 * - Needs to react to route changes for active state styling
 *
 * Design goals:
 * - Keep the component tiny
 * - Avoid string-based icon lookup
 * - Expose clear active/inactive states
 * - Preserve accessibility with `aria-current`
 */
export function SidebarNavLink({ href, icon: Icon, children }: SidebarNavLinkProps) {
    const pathname = usePathname();

    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]",
                isActive
                    ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
        >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{children}</span>

            {isActive && (
                <span
                    className="ms-auto h-1.5 w-1.5 rounded-full bg-blue-400"
                    aria-hidden="true"
                />
            )}
        </Link>
    );
}

