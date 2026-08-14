"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVehicle } from "../api/deleteVehicle";

/**
 * Delete Vehicle Mutation Hook
 *
 * Manages the vehicle deletion mutation.
 *
 * Responsibilities:
 *
 * - Executes deleteVehicle().
 * - Manages loading and error states.
 * - Refreshes the vehicles list after deletion.
 *
 * Relationship with the application:
 *
 * - Used by DeleteVehicleDialog.
 * - Calls deleteVehicle().
 * - Invalidates ["vehicles"] after successful deletion.
 */

export function useDeleteVehicle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteVehicle,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vehicles"],
            });
        },
    });
}