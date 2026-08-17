"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { createVehicle } from "../api/createVehicle";
import { vehicleQueryKeys } from "../constants/vehicle.query-keys";

/**
 * Add Vehicle Mutation Hook
 *
 * Creates a new vehicle and synchronizes
 * the vehicles query cache after success.
 */

export function useCreateVehicle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createVehicle,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: vehicleQueryKeys.list(),
            });
        },
    });
}