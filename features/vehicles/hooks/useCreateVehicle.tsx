

/**
 * Create Vehicle Mutation Hook
 *
 * Manages the vehicle creation mutation.
 *
 * Responsibilities:
 *
 * - Executes createVehicle().
 * - Manages pending/error/success states.
 * - Refreshes the vehicles query after success.
 *
 * Relationship with the application:
 *
 * - Used by VehicleForm.
 * - Calls createVehicle().
 * - Invalidates ["vehicles"] after successful creation.
 */



"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVehicle } from "../api/createVehicle";

export function useCreateVehicle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createVehicle,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vehicles"],
            });
        },
    });
}