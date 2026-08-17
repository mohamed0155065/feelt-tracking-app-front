"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { assignDriver } from "../api/assignDriver";
import { vehicleQueryKeys } from "../constants/vehicle.query-keys";

export function useAssignDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: assignDriver,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: vehicleQueryKeys.list(),
                exact: true,
            });
        },
    });
}