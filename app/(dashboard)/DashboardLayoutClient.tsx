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
        <div className="flex h-screen bg-[#080E21] text-white" dir="rtl">

            {/* Sidebar */}

            <aside className="w-64 flex flex-col border-l border-slate-800/50">

                {/* Logo */}

                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            🚚
                        </div>

                        <div>
                            <h1 className="font-bold text-lg">
                                FleetTrack
                            </h1>

                            <p className="text-[10px] text-slate-500">
                                إدارة الأسطول
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}

                <nav className="p-4 space-y-1">
                    <p className="text-[10px] font-bold text-slate-600 px-3 mb-3 tracking-wider">
                        القائمة الرئيسية
                    </p>

                    {menuItems.map((item) => {
                        const isActive =
                            pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 group text-xs ${isActive
                                        ? "bg-blue-600/15 text-blue-400 font-bold border-r-4 border-blue-500 rounded-r-none"
                                        : "hover:bg-slate-800/50 hover:text-slate-200"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`text-sm transition-transform duration-300 ${isActive
                                                ? "scale-110"
                                                : "group-hover:scale-110"
                                            }`}
                                    >
                                        {item.icon}
                                    </span>

                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* User / Logout */}

                <div className="mt-auto p-4 border-t border-slate-800/50 bg-[#080E21] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex items-center justify-center text-xs shadow-sm">
                            م
                        </div>

                        <div>
                            <p className="text-xs font-bold text-slate-200">
                                مدير النظام
                            </p>

                            <p className="text-[10px] text-slate-500 font-mono">
                                admin@fleet.sa
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="text-[11px] text-red-400 hover:text-red-300 p-1.5 rounded-md hover:bg-red-500/5 transition-colors"
                        title="تسجيل الخروج"
                    >
                        ↩
                    </button>
                </div>
            </aside>

            {/* Main Content */}

            <main className="flex-1 flex flex-col overflow-hidden">
                {children}
            </main>
        </div>
    );
}