import { api } from "@/lib/axios/axios";
import type { Vehicle } from "../types/vehicle.types";

/**
 * Get Vehicles API Service
 *
 * Retrieves the current vehicle collection
 * through the application's Next.js API boundary.
 *
 * Responsibilities:
 * - Sends the GET request.
 * - Returns typed vehicle data.
 *
 * Relationship with the application:
 * - Used by useVehicles().
 * - Uses the shared Axios client.
 * - Communicates with /api/vehicles.
 *
 * This service does not:
 * - Manage React state.
 * - Manage React Query cache.
 * - Render UI.
 * - Communicate directly with Laravel.
 */

export async function getVehicles(): Promise<Vehicle[]> {
    const response = await api.get<Vehicle[]>(
        "/api/vehicles"
    );

    return response.data;
}