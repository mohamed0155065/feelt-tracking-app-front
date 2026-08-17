"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { updateVehicle } from "../api/updateVehicle";
import { vehicleQueryKeys } from "../constants/vehicle.query-keys";
import type { UpdateVehiclePayload } from "../types/vehicle.types";
import type { Vehicle } from "../types/vehicle.types"
/**
 * Update Vehicle Mutation Hook
 *
 * Updates an existing vehicle and synchronizes
 * the cached vehicle list.
 *
 * Responsibilities:
 * - Executes updateVehicle().
 * - Manages mutation state.
 * - Replaces the updated vehicle in the cache.
 *
 * Relationship with the application:
 * - Used by EditVehicleModal.
 * - Calls updateVehicle().
 * - Updates vehicleQueryKeys.list() after success.
 *
 * This hook does not:
 * - Manage form state.
 * - Render UI.
 * - Communicate directly with Laravel.
 */

export function useUpdateVehicle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            payload: UpdateVehiclePayload
        ) => updateVehicle(payload),

        onSuccess: (updatedVehicle) => {
            queryClient.setQueryData(
                vehicleQueryKeys.list(),
                (currentVehicles) => {
                    if (!currentVehicles) {
                        return [updatedVehicle];
                    }

                    return currentVehicles.map((vehicle: Vehicle) =>
                        vehicle.id === updatedVehicle.id
                            ? updatedVehicle
                            : vehicle
                    );
                }
            );

            queryClient.setQueryData(
                vehicleQueryKeys.detail(
                    updatedVehicle.id
                ),
                updatedVehicle
            );
        },
    });
}