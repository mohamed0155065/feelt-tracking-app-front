"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDriver, DriverPayload } from "../api/driverApi";

interface UpdateDriverVariables {
    id: number;
    data: DriverPayload;
}

export function useUpdateDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: UpdateDriverVariables) =>
            updateDriver(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["drivers"],
            });
        },
    });
}