import { api } from "@/lib/axios/axios";
import type { AssignDriverPayload } from "../types/vehicle.types";

/**
 * Assign Driver API Service
 *
 * Sends the driver assignment request.
 *
 * The backend returns HTTP 200 on success.
 * We intentionally do not depend on the response body here,
 * because assignment success is determined by the HTTP response.
 */
export async function assignDriver(
    payload: AssignDriverPayload
): Promise<void> {
    await api.patch(
        `/api/vehicles/${payload.vehicleId}/assign`,
        {
            driver_id: payload.driverId,
        }
    );
}