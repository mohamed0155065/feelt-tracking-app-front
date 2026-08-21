"use client";

import React, { useEffect, useState } from "react";
import type { User } from "@/GlobalTypes/User.types";

interface DriverInterfaceProps {
  user: Pick<User, "name" | "email">;
  vehiclePlate?: string | null;
}

/**
 * DriverInterface — Driver UI Component
 *
 * Responsibilities:
 * - Displays the authenticated driver's information.
 * - Displays the driver's assigned vehicle plate number, if any.
 * - Displays the current tracking state.
 * - Displays the current simulated coordinates.
 * - Handles the driver's Start/End Tracking button UI.
 *
 * Why it receives user and vehiclePlate as props:
 * - Authentication is not the responsibility of this component.
 * - Vehicle assignment lookup is not the responsibility of this component.
 * - The parent feature provides both, keeping this component
 *   focused on presentation and interaction only.
 *
 * Current scope:
 * - The tracking behavior is still simulated.
 * - Geolocation and backend tracking requests are NOT implemented yet.
 */
export const DriverInterface: React.FC<DriverInterfaceProps> = ({ user, vehiclePlate }) => {
  const [isTracking, setIsTracking] = useState(false);

  const [coords, setCoords] = useState({
    lat: 24.7136,
    lng: 46.6753,
  });

  /**
   * Real clock, formatted in Cairo local time (not the
   * user's/browser's system timezone), refreshed every second.
   */
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const cairoTime = new Intl.DateTimeFormat("ar-EG", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isTracking) {
      interval = setInterval(() => {
        setCoords((prev) => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.0005,
          lng: prev.lng + (Math.random() - 0.5) * 0.0005,
        }));
      }, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTracking]);

  /**
   * Warn the driver before leaving/closing the page while
   * tracking is active, so a trip doesn't get interrupted
   * by accident.
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
    <div
      dir="rtl"
      className="w-full max-w-sm bg-slate-950 border border-slate-800 rounded-[40px] p-6 shadow-2xl text-center flex flex-col justify-between min-h-[580px] relative overflow-hidden"
    >
      {/* Active Tracking Background */}
      {isTracking && (
        <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none" />
      )}

      {/* Header / Connection Status */}
      <div className="flex justify-between items-center text-xs text-slate-400 font-mono relative z-10">
        <span className="font-bold">{cairoTime}</span>

        <div className="flex items-center gap-1.5 bg-slate-900/60 px-2 py-1 rounded-full border border-slate-800">
          <span
            className={`w-2 h-2 rounded-full ${isTracking
                ? "bg-emerald-500 animate-ping"
                : "bg-red-500"
              }`}
          />

          <span className="text-[11px] font-medium">
            {isTracking ? "متصل وبث حي" : "غير متصل"}
          </span>
        </div>
      </div>

      {/* Authenticated Driver Information */}
      <div className="mt-4 relative z-10 text-right">
        <h2 className="text-lg font-bold text-white tracking-wide">
          {user.name}
        </h2>

        <p className="text-xs text-slate-400 mt-1 truncate">
          {user.email}
        </p>

        {vehiclePlate ? (
          <p className="text-sm font-mono text-blue-400 mt-2 tracking-wide">
            {vehiclePlate}
          </p>
        ) : (
          <p className="text-[11px] text-amber-500 mt-2">
            لا توجد مركبة معينة لك حاليًا
          </p>
        )}
      </div>

      {/* Tracking Button */}
      <div className="flex flex-col items-center justify-center my-auto relative z-10">
        <div className="relative flex items-center justify-center">
          {isTracking && (
            <>
              <span className="absolute w-44 h-44 rounded-full bg-red-500/20 animate-ping pointer-events-none" />
              <span className="absolute w-48 h-48 rounded-full bg-red-500/10 animate-pulse pointer-events-none" />
            </>
          )}

          <button
            onClick={() => setIsTracking((previous) => !previous)}
            aria-pressed={isTracking}
            aria-label={isTracking ? "إنهاء البث" : "ابدأ التتبع"}
            className={`group w-36 h-36 rounded-full font-bold text-sm transition-all duration-300 shadow-2xl flex flex-col items-center justify-center gap-2 active:scale-90 border select-none ${isTracking
                ? "bg-red-600 border-red-500 text-white shadow-red-600/30"
                : "bg-blue-600 border-blue-500 text-white shadow-blue-600/30 hover:bg-blue-700 hover:scale-105"
              }`}
          >
            <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">
              {isTracking ? "🛑" : "🚚"}
            </span>

            <span className="tracking-wide text-xs">
              {isTracking ? "إنهاء البث" : "ابدأ التتبع"}
            </span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 mt-6 px-4 leading-relaxed">
          {isTracking
            ? "يتم الآن مشاركة إحداثيات موقعك في الخلفية مع لوحة التحكم"
            : "اضغط للبدء في تفعيل الخريطة وبث الرحلة فوراً"}
        </p>
      </div>

      {/* Current Coordinates */}
      <div className="space-y-2 bg-slate-900/80 p-4 rounded-2xl border border-slate-800/60 text-start relative z-10 shadow-inner">
        <span className="text-[10px] text-slate-500 font-semibold block">
          الموقع الحالي:
        </span>

        <span className="text-xs font-mono text-blue-400 block tracking-wide">
          {coords.lat.toFixed(5)}°N, {coords.lng.toFixed(5)}°E
        </span>
      </div>
    </div>
  );
};