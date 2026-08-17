/**
 * Vehicle Query Keys
 *
 * Centralizes every React Query cache key used
 * by the Vehicles feature.
 *
 * Responsibilities:
 * - Provides a single source of truth for vehicle query keys.
 * - Prevents duplicated query-key definitions.
 * - Keeps list and detail cache scopes predictable.
 *
 * Relationship with the application:
 * - Used by useVehicles().
 * - Used by vehicle mutations.
 * - Used when invalidating or updating vehicle cache data.
 *
 * This file does not:
 * - Fetch data.
 * - Mutate data.
 * - Contain UI state.
 */

export const vehicleQueryKeys = {
    all: ["vehicles"] as const,

    list: () =>
        [...vehicleQueryKeys.all, "list"] as const,

    detail: (id: number) =>
        [...vehicleQueryKeys.all, "detail", id] as const,
};