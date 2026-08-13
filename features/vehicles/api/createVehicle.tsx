import { api } from "@/lib/axios/axios";
import type { ApiResponse } from "@/GlobalTypes/ApiTypes/Api.response.types";
import type {
    Vehicle,
    CreateVehiclePayload,
} from "../types/vehicle.types";

/**
 * Create Vehicle API Service
 *
 * Creates a new vehicle through the backend API.
 *
 * Responsibilities:
 *
 * - Sends vehicle creation data.
 * - Sends the POST request.
 * - Returns the created vehicle.
 *
 * Relationship with the application:
 *
 * - Used by useCreateVehicle().
 * - Uses the shared Axios client.
 * - Does not contain UI logic.
 */

export async function createVehicle(
    payload: CreateVehiclePayload
): Promise<Vehicle> {
    const response = await api.post<ApiResponse<Vehicle>>(
        "/api/vehicles",
        payload
    );

    return response.data.data;
}