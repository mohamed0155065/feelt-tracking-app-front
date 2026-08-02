import { api } from "@/lib/axios";

import { ApiResponse } from "../types/api-response.types";
import { Vehicle } from "../types/vehicle.types";

/**
 * Get Vehicles
 *
 * Retrieves all vehicles from the backend API.
 *
 * Responsibilities:
 * - Sends the HTTP request.
 * - Returns the list of vehicles.
 * - Does not contain any UI logic.
 *
 * Relationship with the application:
 * - Used by useVehicles().
 * - Uses the shared Axios client.
 * - Returns typed data for React Query.
 */
export async function getVehicles(): Promise<Vehicle[]> {
    const response = await api.get<ApiResponse<Vehicle[]>>(
        "/api/auth/vehicles"
    );

    return response.data.data;
}