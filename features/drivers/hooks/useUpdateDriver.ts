"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    updateDriver,
    DriverPayload,
} from "../api/driverApi";

export function useUpdateDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: DriverPayload;
        }) => updateDriver(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["drivers"],
            });
        },
    });
}
