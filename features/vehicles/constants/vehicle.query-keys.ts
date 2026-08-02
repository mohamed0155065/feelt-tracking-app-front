/**
 * Vehicle Query Keys
 *
 * Stores every React Query key related
 * to the Vehicles feature.
 *
 * Responsibilities:
 * - Prevents duplicated query keys.
 * - Centralizes cache keys.
 *
 * Relationship with the application:
 * - Used by useVehicles().
 * - Used when invalidating or refetching queries.
 */
export const vehicleQueryKeys = {
    all: ["vehicles"] as const,

    details: (id: number) =>
        [...vehicleQueryKeys.all, id] as const,
};