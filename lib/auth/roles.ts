/**
 * User Roles
 *
 * Defines the supported authorization roles in the application.
 *
 * Responsibilities:
 *
 * - Provides a single source of truth for valid user roles.
 * - Prevents role strings from being duplicated across the application.
 * - Provides type-safe role values for TypeScript.
 *
 * Relationship with the application:
 *
 * - The Backend is the source of truth for the user's actual role.
 * - The Login API receives the role from the Backend.
 * - The role is stored in an HttpOnly cookie for Next.js Middleware
 *   to perform route-level access control.
 *
 * Important:
 *
 * - This file does not authenticate users.
 * - This file does not grant permissions.
 * - This file only defines which roles are recognized by the Frontend.
 */

export const USER_ROLES = {
    MANAGER: "manager",
    DRIVER: "driver",
} as const;

export type UserRole =
    (typeof USER_ROLES)[keyof typeof USER_ROLES];

/**
 * User Role Validation
 *
 * Validates whether a runtime value represents a supported user role.
 *
 * Responsibilities:
 *
 * - Validates role values received from runtime sources.
 * - Prevents the application from assuming that arbitrary strings
 *   represent valid authorization roles.
 * - Provides a TypeScript type guard for safe role handling.
 *
 * Relationship with the application:
 *
 * - Role values may come from HTTP cookies or Backend responses.
 * - TypeScript cannot validate runtime data by itself.
 * - This function performs the runtime check before the role is used
 *   by the authorization layer.
 *
 * Important:
 *
 * - This function does not determine what a role is allowed to access.
 * - It only determines whether the role is recognized by the application.
 */

export function isUserRole(
    role: string | undefined
): role is UserRole {
    return (
        role === USER_ROLES.MANAGER ||
        role === USER_ROLES.DRIVER
    );
}