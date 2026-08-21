/**
 * useAuth
 *
 * Single source of truth for reading the currently
 * authenticated user on the client.
 *
 * Responsibilities:
 * - Reads the persisted user info (name/email/role/id)
 *   that was stored by useLogin on successful login.
 *
 * Relationship with the application:
 * - The actual auth token lives in an HttpOnly cookie and
 *   is never exposed to client JS.
 * - This hook does NOT verify the user is still authenticated
 *   on the server — Next.js middleware already protects routes
 *   based on the "role" cookie before the page renders.
 * - If we later add a real "/api/auth/me" endpoint, this hook
 *   is the only place that needs to change.
 */
"use client";

import { useInfoUser } from "@/features/auth/store/auth.store";

export function useAuth() {
    const userInfo = useInfoUser((state) => state.userInfo);
    const logOut = useInfoUser((state) => state.logOut);

    return {
        user: userInfo,
        isAuthenticated: userInfo.id !== null,
        logOut,
    };
}