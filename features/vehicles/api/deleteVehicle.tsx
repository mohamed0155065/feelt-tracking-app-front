import { api } from "@/lib/axios/axios";
import type { ApiResponse } from "@/GlobalTypes/ApiTypes/Api.response.types";

/**
 * Delete Vehicle API Service
 *
 * Deletes a vehicle through the application API.
 *
 * Responsibilities:
 * - Receives the vehicle ID.
 * - Sends the DELETE request.
 * - Returns when the backend operation succeeds.
 *
 * Relationship with the application:
 * - Used by useDeleteVehicle().
 * - Uses the shared Axios client.
 * - Communicates with /api/vehicles/{id}.
 *
 * This service does not:
 * - Manage UI confirmation state.
 * - Manage React Query cache.
 * - Render notifications.
 */

export async function deleteVehicle(
    vehicleId: number
): Promise<void> {
    await api.delete<ApiResponse<null>>(
        `/api/vehicles/${vehicleId}`
    );
}