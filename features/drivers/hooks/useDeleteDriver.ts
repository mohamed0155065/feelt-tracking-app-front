"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { deleteDriver } from "../api/driverApi";

export function useDeleteDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteDriver,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["drivers"],
            });
        },
    });
}