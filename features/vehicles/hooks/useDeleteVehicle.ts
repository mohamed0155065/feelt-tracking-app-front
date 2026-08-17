"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { deleteVehicle } from "../api/deleteVehicle";
import { vehicleQueryKeys } from "../constants/vehicle.query-keys";
import type { Vehicle } from "../types/vehicle.types"
/**
 * Delete Vehicle Mutation Hook
 *
 * Deletes a vehicle and removes it from the
 * React Query cache.
 *
 * Responsibilities:
 * - Executes deleteVehicle().
 * - Manages mutation state.
 * - Removes the deleted vehicle from the cached list.
 * - Removes the vehicle detail cache.
 *
 * Relationship with the application:
 * - Used by DeleteVehicleDialog.
 * - Calls deleteVehicle().
 * - Synchronizes vehicleQueryKeys after success.
 *
 * This hook does not:
 * - Render confirmation dialogs.
 * - Manage modal visibility.
 * - Perform HTTP requests directly.
 */

export function useDeleteVehicle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteVehicle,

        onSuccess: (_, deletedVehicleId) => {
            queryClient.setQueryData(
                vehicleQueryKeys.list(),
                (currentVehicles) =>
                    currentVehicles?.filter(
                        (vehicle: Vehicle) =>
                            vehicle.id !== deletedVehicleId
                    )
            );

            queryClient.removeQueries({
                queryKey:
                    vehicleQueryKeys.detail(
                        deletedVehicleId
                    ),
            });
        },
    });
}