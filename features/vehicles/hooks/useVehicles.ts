"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getVehicles } from "../api/getVehicles";
import { vehicleQueryKeys } from "../constants/vehicle.query-keys";
import type { Vehicle } from "../types/vehicle.types";

type UseVehiclesOptions = Partial<
  Pick<
    UseQueryOptions<Vehicle[], unknown, Vehicle[]>,
    "refetchInterval" | "refetchIntervalInBackground"
  >
>;

export function useVehicles(options: UseVehiclesOptions = {}) {
  return useQuery({
    queryKey: vehicleQueryKeys.list(),
    queryFn: getVehicles,

    staleTime: 30_000,
    gcTime: 5 * 60_000,

    refetchOnWindowFocus: true,

    // Polling is opt-in.
    refetchInterval: options.refetchInterval,
    refetchIntervalInBackground:
      options.refetchIntervalInBackground ?? false,

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