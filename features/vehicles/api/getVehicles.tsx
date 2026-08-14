import { api } from "@/lib/axios/axios";
import type { Vehicle } from "../types/vehicle.types";

/**
 * Get Vehicles API Service
 *
 * Responsibilities:
 *
 * - Calls the Next.js vehicles API route.
 * - Receives the vehicles array.
 * - Returns typed vehicle data.
 *
 * It does NOT:
 * - Manage loading.
 * - Manage errors.
 * - Handle caching.
 * - Call Laravel directly.
 *
 * React Query handles those responsibilities.
 */

export async function getVehicles(): Promise<Vehicle[]> {
    const response = await api.get<Vehicle[]>(
        "/api/vehicles"
    );

    return response.data;
}