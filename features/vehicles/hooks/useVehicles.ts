import { useQuery } from "@tanstack/react-query";

import { getVehicles } from "../api/getVehicles";
import { vehicleQueryKeys } from "../constants/vehicle.query-keys";

/**
 * Vehicles Query
 *
 * React Query hook responsible for fetching and caching
 * the vehicles collection.
 *
 * Responsibilities:
 * - Fetches vehicles from the backend.
 * - Caches the response.
 * - Exposes loading, error and success states.
 * - Keeps server state synchronized.
 *
 * Relationship with the application:
 * - VehicleList reads the vehicles.
 * - Map reads the vehicles.
 * - Vehicle Details reads the vehicles.
 * - Any component can subscribe to this hook
 *   and automatically re-render when the data changes.
 */
export function useVehicles() {
    return useQuery({
        queryKey: vehicleQueryKeys.all,

        queryFn: getVehicles,

        staleTime: 60 * 1000,
    });
}