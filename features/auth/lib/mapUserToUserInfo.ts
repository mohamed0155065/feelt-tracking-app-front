/**
 * mapUserToUserInfo
 *
 * Single source of truth for converting the backend `User` shape
 * into the client-side `UserInfo` shape stored in the auth store.
 *
 * Why this exists:
 * - Prevents silently dropping fields (e.g. vehicle_id) when
 *   mapping the login response into local state.
 * - Any new field added to `User` that the UI needs must be
 *   added here explicitly — a single, reviewable choke point.
 */
import type { User } from "../types";
import type { UserInfo } from "../store/types.auth.store";

export function mapUserToUserInfo(user: User): UserInfo {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? null,
    role: user.role,
    vehicle_id: user.vehicle_id ?? null,
  };
}