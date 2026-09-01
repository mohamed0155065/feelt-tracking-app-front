/**
 * Driver Tracking Interface
 *
 * Presents the authenticated driver's tracking workspace.
 *
 * Responsibilities:
 *
 * - Displays the authenticated driver's identity.
 * - Displays the assigned vehicle information.
 * - Displays the current tracking state.
 * - Displays the current location state.
 * - Provides the Start/Stop Tracking interaction.
 * - Displays Cairo local time.
 * - Warns the driver before leaving while tracking is active.
 *
 * Relationship with the application:
 *
 * - Receives authenticated driver data from TrackingPage.
 * - Receives the already-resolved assigned vehicle from TrackingPage.
 * - Does not perform vehicle lookup.
 * - Does not access the authentication store.
 * - Does not call the vehicles API.
 * - Does not communicate directly with Laravel.
 *
 * Current tracking implementation:
 *
 * - Location updates are currently simulated.
 * - Geolocation and WebSocket integration can replace the simulation
 *   without changing the authentication or vehicle-assignment flow.
 */

"use client";

import { useEffect, useState } from "react";

import type { User } from "@/GlobalTypes/User.types";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

interface DriverInterfaceProps {
  user: Pick<User, "name" | "email">;
  vehicle: Vehicle;
}

export function DriverInterface({
  user,
  vehicle,
}: DriverInterfaceProps) {
  const [isTracking, setIsTracking] = useState(false);

  const [coords, setCoords] = useState({
    lat: 24.7136,
    lng: 46.6753,
  });

  const [now, setNow] = useState(() => new Date());

  /**
   * Updates the displayed Cairo time once per second.
   *
   * The UI only needs one clock state for the entire component.
   */
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const cairoTime = new Intl.DateTimeFormat("ar-EG", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  /**
   * Temporary tracking simulation.
   *
   * This will later be replaced by the geolocation/WebSocket
   * tracking implementation.
   */
  useEffect(() => {
    if (!isTracking) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCoords((previous) => ({
        lat: previous.lat + (Math.random() - 0.5) * 0.0005,
        lng: previous.lng + (Math.random() - 0.5) * 0.0005,
      }));
    }, 2000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isTracking]);

  /**
   * Prevents accidental page closing while tracking is active.
   */
  useEffect(() => {
    if (!isTracking) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isTracking]);

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950 shadow-2xl">
        {/* Header */}
        <header className="border-b border-slate-800 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500">
                نظام تتبع السائق
              </p>

              <p className="mt-1 text-lg font-bold tracking-tight text-white">
                {user.name}
              </p>
            </div>

            <div className="text-left">
              <p className="font-mono text-sm font-semibold text-slate-300">
                {cairoTime}
              </p>

              <div className="mt-1 flex items-center justify-end gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isTracking
                      ? "animate-pulse bg-emerald-500"
                      : "bg-slate-600"
                  }`}
                />

                <span className="text-[10px] text-slate-500">
                  {isTracking ? "البث نشط" : "جاهز"}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-2 truncate text-xs text-slate-500">
            {user.email}
          </p>
        </header>

        {/* Vehicle */}
        <section className="px-6 pt-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium text-slate-500">
                  المركبة المخصصة
                </p>

                <h2 className="mt-2 text-base font-bold text-white">
                  {vehicle.model ?? "مركبة"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {vehicle.type ?? "غير محدد"}
                </p>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-left">
                <p className="text-[9px] text-slate-500">
                  اللوحة
                </p>

                <p className="mt-1 font-mono text-sm font-bold text-blue-400">
                  {vehicle.plate_number ?? "غير متاحة"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tracking Control */}
        <section className="px-6 py-8">
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              {isTracking && (
                <>
                  <span className="absolute h-48 w-48 animate-ping rounded-full bg-red-500/10" />
                  <span className="absolute h-40 w-40 animate-pulse rounded-full bg-red-500/10" />
                </>
              )}

              <button
                type="button"
                onClick={() =>
                  setIsTracking((previous) => !previous)
                }
                aria-pressed={isTracking}
                aria-label={
                  isTracking
                    ? "إنهاء التتبع"
                    : "بدء التتبع"
                }
                className={`relative flex h-36 w-36 flex-col items-center justify-center rounded-full border text-white shadow-2xl transition-all duration-300 active:scale-95 ${
                  isTracking
                    ? "border-red-500 bg-red-600 shadow-red-900/30"
                    : "border-blue-500 bg-blue-600 shadow-blue-900/30 hover:scale-105 hover:bg-blue-700"
                }`}
              >
                <span className="text-3xl">
                  {isTracking ? "🛑" : "🚚"}
                </span>

                <span className="mt-2 text-xs font-bold">
                  {isTracking
                    ? "إنهاء التتبع"
                    : "ابدأ التتبع"}
                </span>
              </button>
            </div>

            <p className="mt-6 max-w-xs text-center text-[11px] leading-6 text-slate-500">
              {isTracking
                ? "يتم الآن تشغيل جلسة التتبع وإرسال موقع المركبة."
                : "ابدأ التتبع عند بدء الرحلة لمشاركة موقع المركبة."}
            </p>
          </div>
        </section>

        {/* Location */}
        <section className="border-t border-slate-800 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-slate-500">
                الموقع الحالي
              </p>

              <p className="mt-2 font-mono text-xs text-blue-400">
                {coords.lat.toFixed(5)}°N
              </p>

              <p className="mt-1 font-mono text-xs text-blue-400">
                {coords.lng.toFixed(5)}°E
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-lg">
              📍
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}