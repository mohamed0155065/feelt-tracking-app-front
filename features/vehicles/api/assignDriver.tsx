import { api } from "@/lib/axios/axios";
import type { ApiResponse } from "@/GlobalTypes/ApiTypes/Api.response.types";
import type { AssignDriverPayload } from "../types/vehicle.types";

/**
 * Assign Driver API Service
 *
 * Assigns a driver to a specific vehicle.
 *
 * Responsibilities:
 *
 * - Receives the vehicle ID.
 * - Receives the driver ID.
 * - Sends the assignment request to the backend.
 * - Returns the backend response.
 *
 * Relationship with the application:
 *
 * - Used by useAssignDriver().
 * - Uses the shared Axios client.
 * - Does not contain UI logic.
 * - Does not manage React Query state.
 *
 * Security:
 *
 * - Authentication is handled by the shared API client.
 * - The authentication token is not manually exposed
 *   to the component.
 *
 * NOTE:
 *
 * The endpoint must match the Laravel backend contract.
 */

export async function assignDriver(
    payload: AssignDriverPayload
): Promise<void> {
    await api.patch<ApiResponse<null>>(
        `/api/vehicles/${payload.vehicleId}/driver`,
        {
            driver_id: payload.driverId,
        }
    );
}