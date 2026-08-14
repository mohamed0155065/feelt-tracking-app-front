import { api } from "@/lib/axios/axios";
import type { ApiResponse } from "@/GlobalTypes/ApiTypes/Api.response.types";

/**
 * Delete Vehicle API Service
 *
 * Deletes a vehicle from the backend.
 *
 * Responsibilities:
 *
 * - Sends the vehicle ID.
 * - Executes the DELETE request.
 * - Returns the backend response.
 *
 * Relationship with the application:
 *
 * - Used by useDeleteVehicle().
 * - Uses the shared Axios client.
 * - Does not contain UI logic.
 */

export async function deleteVehicle(
    vehicleId: number
): Promise<void> {
    await api.delete<ApiResponse<null>>(
        `/api/vehicles/${vehicleId}`
    );
}