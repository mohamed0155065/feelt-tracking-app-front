"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignDriver } from "../api/assignDriver";

/**
 * Assign Driver Mutation Hook
 *
 * Manages assigning a driver to a vehicle.
 *
 * Responsibilities:
 *
 * - Executes assignDriver().
 * - Manages pending/error/success states.
 * - Refreshes vehicle data after successful assignment.
 *
 * Relationship with the application:
 *
 * - Used by AssignDriverDialog.
 * - Calls assignDriver().
 * - Invalidates ["vehicles"] after success so the UI
 *   receives the updated driver relationship.
 *
 * Important:
 *
 * This hook does not communicate directly with Laravel.
 * The API service handles the HTTP request.
 */

export function useAssignDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: assignDriver,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vehicles"],
            });
        },
    });
}