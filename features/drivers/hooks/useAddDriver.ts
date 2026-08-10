/**
 * Add Driver Mutation Hook
 *
 * Manages the mutation for creating a new driver.
 *
 * Responsibilities:
 *
 * - Executes the add-driver request.
 * - Manages loading, success, and error states.
 * - Invalidates the drivers query after successful creation.
 *
 * Relationship with the application:
 *
 * - Uses addDriver() from driverApi.ts.
 * - Uses React Query mutations.
 * - Triggers a fresh drivers fetch after successful creation.
 */

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDriver } from "../api/driverApi";

export function useAddDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addDriver,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["drivers"],
            });
        },
    });
}