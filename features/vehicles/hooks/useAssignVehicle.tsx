"use client";

import { useMemo } from "react";

import { useVehicles } from "./useVehicles";

export function useAssignedVehicle(
  vehicleId?: number | null,
) {
  const query = useVehicles({
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });

  const assignedVehicle = useMemo(() => {
    const vehicles = query.data ?? [];

    if (vehicleId == null || vehicles.length === 0) {
      return null;
    }

    return (
      vehicles.find(
        (vehicle) => Number(vehicle.id) === Number(vehicleId),
      ) ?? null
    );
  }, [query.data, vehicleId]);

  return {
    ...query,
    assignedVehicle,
  };
}