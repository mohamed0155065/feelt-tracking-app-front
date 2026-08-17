import { api } from "@/lib/axios/axios";
import type {
    UpdateVehiclePayload,
    Vehicle,
} from "../types/vehicle.types";

/**
 * Update Vehicle API Service
 *
 * Performs a partial update for an existing vehicle.
 *
 * All vehicle fields are optional except the vehicle ID.
 */
export async function updateVehicle(
    payload: UpdateVehiclePayload
): Promise<Vehicle> {
    const { id, ...data } = payload;

    const response = await api.patch<Vehicle>(
        `/api/vehicles/${id}`,
        data
    );

    return response.data;
}