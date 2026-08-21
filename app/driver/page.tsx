/**
 * Driver Tracking Page
 *
 * Entry point for the authenticated driver's tracking screen.
 *
 * Responsibilities:
 * - Reads the authenticated driver from useAuth().
 * - Reads the driver's assigned vehicle from the vehicles cache
 *   (vehicle.driver_id === user.id), same single source of truth
 *   used by the Drivers admin page.
 * - Renders DriverInterface with real data.
 *
 * Not yet implemented (intentionally):
 * - Actual geolocation reading/watching.
 * - Sending location updates to the backend.
 *   These are scaffolded in features/tracking/api/tracking.api.ts
 *   and features/tracking/hooks/useGeolocation.ts, ready to be
 *   wired up once the backend endpoint exists.
 */

"use client";

import React from "react";
import { useAuth } from "@/GlobalHooks/useAuth";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { DriverInterface } from "@/features/tracking/components/DriverInterface";
import { OfflineBanner } from "./OfflineBanner";

export default function TrackingPage() {
  const { user, isAuthenticated } = useAuth();
  const { data: vehicles = [] } = useVehicles();

  const assignedVehicle = vehicles.find(
    (vehicle) => String(vehicle.driver_id) === user.id
  );

  return (
    <main className="relative min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      {/* Offline banner at the top to notify connection status */}
      <OfflineBanner />

      {!isAuthenticated || !user.name || !user.email ? (
        <p className="text-sm text-slate-400">
          جاري تحميل بيانات السائق...
        </p>
      ) : (
        <DriverInterface
          user={{ name: user.name, email: user.email }}
          vehiclePlate={assignedVehicle?.plate_number ?? null}
        />
      )}
    </main>
  );
}