import { api } from "@/lib/axios/axios";
import type { ApiResponse } from "@/GlobalTypes/ApiTypes/Api.response.types";
import type { Vehicle } from "../types/vehicle.types";

/**
 * Get Vehicles API Service
 *
 * Retrieves all vehicles from the backend.
 *
 * Responsibilities:
 *
 * - Sends the GET request.
 * - Receives the backend response.
 * - Returns the vehicles data.
 *
 * Relationship with the application:
 *
 * - Used by useVehicles().
 * - Uses the shared Axios client.
 * - Does not contain UI logic.
 * - Does not manage loading or error states.
 */

export async function getVehicles(): Promise<Vehicle[]> {
    const response = await api.get<ApiResponse<Vehicle[]>>(
        "/api/vehicles"
    );

    return response.data.data;
}