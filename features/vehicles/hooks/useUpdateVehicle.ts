"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVehicle } from "../api/updateVehicle";

/**
 * Update Vehicle Mutation Hook
 *
 * Manages the vehicle update mutation.
 *
 * Responsibilities:
 *
 * - Executes updateVehicle().
 * - Manages mutation state.
 * - Refreshes vehicle data after success.
 *
 * Relationship with the application:
 *
 * - Used by VehicleForm.
 * - Calls updateVehicle().
 * - Invalidates ["vehicles"] after successful update.
 */

export function useUpdateVehicle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateVehicle,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vehicles"],
            });
        },
    });
}