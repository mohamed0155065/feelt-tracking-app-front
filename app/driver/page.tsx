/**
 * Driver Tracking Page
 *
 * Entry point for the authenticated driver's tracking experience.
 *
 * Responsibilities:
 *
 * - Reads the authenticated driver from useAuth().
 * - Reads the existing vehicles query through useVehicles().
 * - Resolves the driver's assigned vehicle.
 * - Handles loading, error, and missing-assignment states.
 * - Passes resolved domain data to DriverInterface.
 *
 * Relationship with the application:
 *
 * - Uses useAuth() as the client-side authentication state source.
 * - Uses useVehicles() as the existing vehicle server-state query.
 * - Uses DriverInterface for presentation and tracking interaction.
 * - Does not communicate directly with Laravel.
 * - Does not implement geolocation or WebSocket logic.
 *
 * Vehicle resolution strategy:
 *
 * - Primary: match by `vehicle.id === user.vehicle_id`.
 * - Fallback: match by `vehicle.driver_id === user.id`.
 *
 * Performance:
 *
 * - Reuses the existing vehicles React Query cache.
 * - Does not introduce another vehicle API request.
 */

"use client";

import type { ReactNode } from "react";

import { useAuth } from "@/GlobalHooks/useAuth";
import { DriverInterface } from "@/features/tracking/components/DriverInterface";
import { useAssignedVehicle } from "@/features/vehicles/hooks/useAssignVehicle";

import { OfflineBanner } from "./OfflineBanner";

export default function TrackingPage() {
  const { user, isAuthenticated } = useAuth();

  const {
    assignedVehicle,
    isLoading: isVehiclesLoading,
    isError: isVehiclesError,
    refetch: refetchVehicles,
  } = useAssignedVehicle(
    user?.vehicle_id,
  );
  /*
   * Authentication state is not ready yet.
   */
  if (!isAuthenticated || !user?.name || !user?.email) {
    return (
      <TrackingPageState>
        <p className="text-sm text-slate-400">
          جاري تحميل بيانات السائق...
        </p>
      </TrackingPageState>
    );
  }

  /*
   * Vehicle data is still loading.
   */
  if (isVehiclesLoading) {
    return (
      <TrackingPageState>
        <div className="space-y-3 text-center">
          <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-slate-800" />

          <p className="text-sm text-slate-400">
            جاري تحميل بيانات المركبة...
          </p>
        </div>
      </TrackingPageState>
    );
  }

  /*
   * Vehicle API request failed.
   */
  if (isVehiclesError) {
    return (
      <TrackingPageState>
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
            !
          </div>

          <h2 className="text-sm font-semibold text-white">
            تعذر تحميل بيانات المركبة
          </h2>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            حدث خطأ أثناء تحميل بيانات المركبة. حاول مرة أخرى.
          </p>

          <button
            type="button"
            onClick={() => refetchVehicles()}
            className="mt-5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
          >
            إعادة المحاولة
          </button>
        </div>
      </TrackingPageState>
    );
  }

  /*
   * The authenticated driver has no vehicle assigned.
   */
  if (!assignedVehicle) {
    return (
      <TrackingPageState>
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
            🚚
          </div>

          <h2 className="text-sm font-semibold text-white">
            لا توجد مركبة معينة لهذا السائق
          </h2>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            لم يتم تعيين مركبة لهذا الحساب حتى الآن. يرجى التواصل مع مسؤول
            الأسطول.
          </p>
        </div>
      </TrackingPageState>
    );
  }

  return (
    <section
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      <OfflineBanner />

      <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <DriverInterface
          user={{
            name: user.name,
            email: user.email,
          }}
          vehicle={assignedVehicle}
        />
      </div>
    </section>
  );
}

/*
 * Tracking Page State
 *
 * Shared layout for non-interactive page states.
 */
function TrackingPageState({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section
      dir="rtl"
      className="relative min-h-screen bg-slate-950 text-white"
    >
      <OfflineBanner />

      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        {children}
      </div>
    </section>
  );
}