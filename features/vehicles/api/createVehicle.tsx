import { api } from "@/lib/axios/axios";
import type { ApiResponse } from "@/GlobalTypes/ApiTypes/Api.response.types";
import type {
    CreateVehiclePayload,
    Vehicle,
} from "../types/vehicle.types";

/**
 * Create Vehicle API Service
 *
 * Creates a new vehicle through the application API.
 *
 * Responsibilities:
 * - Sends vehicle creation data.
 * - Executes the POST request.
 * - Returns the created vehicle.
 *
 * Relationship with the application:
 * - Used by useCreateVehicle().
 * - Uses the shared Axios client.
 * - Communicates with /api/vehicles.
 *
 * This service does not:
 * - Manage React Query.
 * - Manage UI state.
 * - Render components.
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