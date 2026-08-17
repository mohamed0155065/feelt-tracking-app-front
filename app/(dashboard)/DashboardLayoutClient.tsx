"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/**
 * Dashboard Layout Client
 *
 * This Client Component is responsible for the interactive
 * Admin Dashboard shell.
 *
 * Responsibilities:
 *
 * - Displays the Admin Dashboard sidebar.
 * - Displays Admin navigation links.
 * - Highlights the active route.
 * - Handles client-side logout navigation.
 *
 * Relationship with the application:
 *
 * - It is rendered by the Server Layout only for Manager users.
 * - The Server Layout is responsible for reading the HttpOnly
 *   role cookie.
 * - This component does not read authentication cookies.
 *
 * Why it is a Client Component:
 *
 * - Uses usePathname() to detect the active route.
 * - Uses useRouter() for client-side navigation.
 * - Contains interactive UI such as the logout button.
 *
 * Security:
 *
 * - The role is intentionally not read here.
 * - Authorization is handled by Middleware and the Backend.
 */




export default function DashboardLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        {
            name: "الخريطة المباشرة",
            href: "/dashboard",
            icon: "📊",
        },
        {
            name: "السائقون",
            href: "/drivers",
            icon: "👥",
        },
        {
            name: "المركبات",
            href: "/vehicles",
            icon: "🚚",
        },
        {
            name: "سجل الرحلات",
            href: "/history",
            icon: "⏱️",
        },
    ];

    return (
        <div
            dir="rtl"
            className="
                flex
                h-dvh
                overflow-hidden
                bg-[#080E21]
                text-white
            "
        >
            {/* ================= SIDEBAR ================= */}

            <aside
                className="
                    flex
                    h-dvh
                    w-64
                    shrink-0
                    flex-col
                    border-l
                    border-slate-800/50
                "
            >
                {/* Logo */}

                <div className="shrink-0 p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                            🚚
                        </div>

                        <div>
                            <h1 className="text-lg font-bold">
                                FleetTrack
                            </h1>

                            <p className="text-[10px] text-slate-500">
                                إدارة الأسطول
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}

                <nav
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                        p-4
                        space-y-1
                    "
                >
                    <p className="mb-3 px-3 text-[10px] font-bold tracking-wider text-slate-600">
                        القائمة الرئيسية
                    </p>

                    {menuItems.map((item) => {
                        const isActive =
                            pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    rounded-lg
                                    px-3
                                    py-2.5
                                    text-xs
                                    transition-all
                                    duration-200

                                    ${isActive
                                        ? "rounded-r-none border-r-4 border-blue-500 bg-blue-600/15 font-bold text-blue-400"
                                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`
                                            text-sm
                                            transition-transform
                                            duration-200

                                            ${isActive
                                                ? "scale-110"
                                                : "group-hover:scale-110"
                                            }
                                        `}
                                    >
                                        {item.icon}
                                    </span>

                                    <span>
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* User / Logout */}

                <div
                    className="
                        shrink-0
                        border-t
                        border-slate-800/50
                        bg-[#080E21]
                        p-4
                    "
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-blue-600
                                    text-xs
                                    font-bold
                                    text-white
                                    shadow-sm
                                "
                            >
                                م
                            </div>

                            <div>
                                <p className="text-xs font-bold text-slate-200">
                                    مدير النظام
                                </p>

                                <p className="font-mono text-[10px] text-slate-500">
                                    admin@fleet.sa
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                router.push("/login")
                            }
                            className="
                                rounded-md
                                p-1.5
                                text-[11px]
                                text-red-400
                                transition-colors
                                hover:bg-red-500/5
                                hover:text-red-300
                            "
                            title="تسجيل الخروج"
                        >
                            ↩
                        </button>
                    </div>
                </div>
            </aside>

            {/* ================= MAIN CONTENT ================= */}

            <main
                className="
                    min-h-0
                    min-w-0
                    flex-1
                    overflow-y-auto
                    overflow-x-hidden
                "
            >
                {children}
            </main>
        </div>
    );
}