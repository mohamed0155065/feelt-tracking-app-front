"use client";

import React from "react";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { DriverInterface } from "@/features/tracking/components/DriverInterface";
import { OfflineBanner } from "./OfflineBanner";
import type { ServerUser } from "@/lib/server-session";

interface DriverPageClientProps {
  user: ServerUser;
}

/**
 * DriverPageClient
 *
 * Responsibilities:
 * - Receives the server-resolved user (no loading state needed —
 *   identity was already resolved before this component mounted).
 * - Fetches the vehicles list and derives the driver's assigned
 *   vehicle (vehicle.driver_id === user.id), same single source
 *   of truth used by the Drivers admin page.
 * - Renders DriverInterface with real data.
 */
export function DriverPageClient({ user }: DriverPageClientProps) {
  const { data: vehicles = [] } = useVehicles();

  const assignedVehicle = vehicles.find(
    (vehicle) => String(vehicle.driver_id) === user.id
  );

  return (
    <main className="relative min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <OfflineBanner />

      <DriverInterface
        user={{ name: user.name, email: user.email }}
        vehiclePlate={assignedVehicle?.plate_number ?? null}
      />
    </main>
  );
}