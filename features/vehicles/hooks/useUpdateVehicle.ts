"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { updateVehicle } from "../api/updateVehicle";
import type { UpdateVehiclePayload } from "../types/vehicle.types";

export function useUpdateVehicle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateVehiclePayload) =>
            updateVehicle(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vehicles"],
            });
        },
    });
}