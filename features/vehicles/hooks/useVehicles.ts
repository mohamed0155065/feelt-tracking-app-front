"use client";

import { useQuery } from "@tanstack/react-query";

import { getVehicles } from "../api/getVehicles";
import { vehicleQueryKeys } from "../constants/vehicle.query-keys";

export function useVehicles() {
    return useQuery({
        queryKey: vehicleQueryKeys.list(),
        queryFn: getVehicles,

        staleTime: 30_000,

        gcTime: 5 * 60_000,

        refetchOnWindowFocus: true,

        /**
         * Never allow an invalid response to become
         * the vehicle list consumed by the UI.
         */
        select: (vehicles) => {
            if (!Array.isArray(vehicles)) {
                return [];
            }

            return vehicles.filter(Boolean);
        },
    });
}