/**
 * Driver Tracking Page
 *
 * Entry point for the authenticated driver's tracking screen.
 *
 * Responsibilities:
 * - Reads the authenticated driver from useAuth().
 * - Reads vehicles from the existing React Query cache.
 * - Resolves the driver's assigned vehicle using user.vehicle_id.
 * - Renders DriverInterface with real driver and vehicle data.
 */

"use client";

import React from "react";

import { useAuth } from "@/GlobalHooks/useAuth";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { DriverInterface } from "@/features/tracking/components/DriverInterface";

import { OfflineBanner } from "./OfflineBanner";

export default function TrackingPage() {
  const { user, isAuthenticated } = useAuth();

  const {
    data: vehicles = [],
    isLoading: isVehiclesLoading,
    isError: isVehiclesError,
  } = useVehicles();

  /**
   * Resolve the vehicle directly from the authenticated user's
   * vehicle_id returned by the backend.
   *
   * Example:
   * user.vehicle_id = 19
   * vehicle.id = 19
   */
  const assignedVehicle = React.useMemo(() => {
    if (user.vehicle_id == null || vehicles.length === 0) {
      return null;
    }

    return (
      vehicles.find(
        (vehicle) => Number(vehicle.id) === Number(user.vehicle_id),
      ) ?? null
    );
  }, [vehicles, user.vehicle_id]);

  /**
   * Authentication/user information is still being hydrated.
   */
  if (!isAuthenticated || !user.name || !user.email) {
    return (
      <main className="relative min-h-screen bg-slate-950 text-white">
        <OfflineBanner />

        <div className="flex min-h-screen items-center justify-center p-4">
          <p className="text-sm text-slate-400">
            جاري تحميل بيانات السائق...
          </p>
        </div>
      </main>
    );
  }

  /**
   * Vehicles are still loading.
   * Do not incorrectly show "no vehicle" while the request is pending.
   */
  if (isVehiclesLoading) {
    return (
      <main className="relative min-h-screen bg-slate-950 text-white">
        <OfflineBanner />

        <div className="flex min-h-screen items-center justify-center p-4">
          <p className="text-sm text-slate-400">
            جاري تحميل بيانات المركبة...
          </p>
        </div>
      </main>
    );
  }

  /**
   * Vehicle request failed.
   */
  if (isVehiclesError) {
    return (
      <main className="relative min-h-screen bg-slate-950 text-white">
        <OfflineBanner />

        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="text-center">
            <p className="text-sm font-medium text-red-400">
              تعذر تحميل بيانات المركبة
            </p>

            <p className="mt-2 text-xs text-slate-500">
              حاول تحديث الصفحة مرة أخرى.
            </p>
          </div>
        </div>
      </main>
    );
  }

  /**
   * The authenticated user does not have a vehicle assigned.
   */
  if (user.vehicle_id == null) {
    return (
      <main className="relative min-h-screen bg-slate-950 text-white">
        <OfflineBanner />

        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-300">
              لا توجد مركبة معينة لهذا السائق
            </p>

            <p className="mt-2 text-xs text-slate-500">
              يرجى التواصل مع مسؤول الأسطول لتعيين مركبة.
            </p>
          </div>
        </div>
      </main>
    );
  }

  /**
   * The user has a vehicle_id, but the vehicle is not present
   * in the vehicles response.
   */
  if (!assignedVehicle) {
    return (
      <main className="relative min-h-screen bg-slate-950 text-white">
        <OfflineBanner />

        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-300">
              لم يتم العثور على المركبة المرتبطة بهذا السائق
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Vehicle ID: {user.vehicle_id}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      <OfflineBanner />

      <DriverInterface
        user={{
          name: user.name,
          email: user.email,
        }}
        vehiclePlate={assignedVehicle.plate_number}
      />
    </main>
  );
}