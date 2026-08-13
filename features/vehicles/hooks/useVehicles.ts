"use client";

import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "../api/getVehicles";

/**
 * Get Vehicles Query Hook
 *
 * Manages the server state of vehicles.
 *
 * Responsibilities:
 *
 * - Executes getVehicles().
 * - Manages loading state.
 * - Manages error state.
 * - Caches vehicle data.
 * - Refetches vehicle data when required.
 *
 * Relationship with the application:
 *
 * - Used by VehicleList.
 * - Calls getVehicles().
 * - Uses React Query for server-state management.
 */

export function useVehicles() {
    return useQuery({
        queryKey: ["vehicles"],
        queryFn: getVehicles,
    });
}