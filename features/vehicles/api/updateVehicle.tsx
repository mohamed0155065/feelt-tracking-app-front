import { api } from "@/lib/axios/axios";
import type { ApiResponse } from "@/GlobalTypes/ApiTypes/Api.response.types";
import type {
    Vehicle,
    UpdateVehiclePayload,
} from "../types/vehicle.types";

/**
 * Update Vehicle API Service
 *
 * Updates an existing vehicle.
 *
 * Responsibilities:
 *
 * - Sends the vehicle ID.
 * - Sends the updated vehicle data.
 * - Returns the updated vehicle.
 *
 * Relationship with the application:
 *
 * - Used by useUpdateVehicle().
 * - Uses the shared Axios client.
 * - Does not contain UI logic.
 */

export async function updateVehicle(
    payload: UpdateVehiclePayload
): Promise<Vehicle> {
    const { id, ...data } = payload;

    const response = await api.patch<ApiResponse<Vehicle>>(
        `/api/vehicles/${id}`,
        data
    );

    return response.data.data;
}