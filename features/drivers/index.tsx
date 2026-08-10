/**
 * Drivers Feature
 *
 * Main container for the drivers management feature.
 *
 * Responsibilities:
 * - Fetches drivers from the API.
 * - Normalizes backend is_active values.
 * - Filters drivers by active/inactive status.
 * - Displays driver counts.
 * - Controls Add/Edit/Delete UI state.
 * - Passes drivers and actions to the table.
 */

"use client";

import React, { useState } from "react";

import { DriversTable } from "./components/DriversTable";
import { AddDriverModal } from "./components/AddDriverModal";
import { DeleteDriverDialog } from "./components/DeleteDriverDialog";
import { EditDriverModal } from "./components/EditDriverModal";

import { useGetAllDrivers } from "./hooks/useGetAllDrivers";

import type { Driver } from "./components/DriversTable";

export default function DriversFeature() {
  /* ----------------------------------------
   * UI State
   * ---------------------------------------- */

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedDriver, setSelectedDriver] =
    useState<Driver | null>(null);

  const [driverToDelete, setDriverToDelete] =
    useState<Driver | null>(null);

  const [filter, setFilter] = useState<
    "all" | "online" | "offline"
  >("all");

  /* ----------------------------------------
   * Fetch Drivers
   * ---------------------------------------- */

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetAllDrivers();

  /**
   * Backend returns:
   *
   * is_active: 1
   * is_active: 0
   *
   * Normalize it once here so the rest of
   * the frontend works with boolean values.
   */
  const drivers: Driver[] = (data?.data ?? []).map(
    (driver: Driver) => ({
      ...driver,
      is_active: Number(driver.is_active) === 1,
    })
  );

  /* ----------------------------------------
   * Driver Counts
   * ---------------------------------------- */

  const activeCount = drivers.filter(
    (driver) => driver.is_active === true
  ).length;

  const inactiveCount = drivers.filter(
    (driver) => driver.is_active === false
  ).length;

  /* ----------------------------------------
   * Filter Drivers
   * ---------------------------------------- */

  const filteredDrivers = drivers.filter((driver) => {
    if (filter === "all") {
      return true;
    }

    if (filter === "online") {
      return driver.is_active === true;
    }

    if (filter === "offline") {
      return driver.is_active === false;
    }

    return true;
  });

  /* ----------------------------------------
   * Render
   * ---------------------------------------- */

  return (
    <div
      className="space-y-4"
      dir="rtl"
    >
      {/* ----------------------------------------
       * Header
       * ---------------------------------------- */}

      <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white px-5 py-4 shadow-sm">
        <div>
          <h1 className="text-base font-bold text-slate-800">
            السائقون
          </h1>

          <p className="mt-1 text-[11px] text-slate-400">
            {drivers.length} سائق مسجل
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
        >
          <span className="text-sm leading-none">
            +
          </span>

          إضافة سائق جديد
        </button>
      </div>

      {/* ----------------------------------------
       * Statistics / Filters
       * ---------------------------------------- */}

      <div className="rounded-xl border border-slate-200/70 bg-white px-4">
        <div className="flex items-center gap-2 overflow-x-auto">

          {/* All */}

          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs transition-colors ${filter === "all"
                ? "border-blue-600 font-bold text-blue-600"
                : "border-transparent font-medium text-slate-400 hover:text-slate-600"
              }`}
          >
            <span>الكل</span>

            <span
              className={`rounded-full px-1.5 py-0.5 text-[9px] ${filter === "all"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-slate-100 text-slate-400"
                }`}
            >
              {drivers.length}
            </span>
          </button>

          {/* Active */}

          <button
            type="button"
            onClick={() => setFilter("online")}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs transition-colors ${filter === "online"
                ? "border-blue-600 font-bold text-blue-600"
                : "border-transparent font-medium text-slate-400 hover:text-slate-600"
              }`}
          >
            <span>نشط</span>

            <span
              className={`rounded-full px-1.5 py-0.5 text-[9px] ${filter === "online"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-slate-100 text-slate-400"
                }`}
            >
              {activeCount}
            </span>
          </button>

          {/* Inactive */}

          <button
            type="button"
            onClick={() => setFilter("offline")}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs transition-colors ${filter === "offline"
                ? "border-blue-600 font-bold text-blue-600"
                : "border-transparent font-medium text-slate-400 hover:text-slate-600"
              }`}
          >
            <span>غير نشط</span>

            <span
              className={`rounded-full px-1.5 py-0.5 text-[9px] ${filter === "offline"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-slate-100 text-slate-400"
                }`}
            >
              {inactiveCount}
            </span>
          </button>

        </div>
      </div>

      {/* ----------------------------------------
       * Loading
       * ---------------------------------------- */}

      {isLoading && (
        <div className="rounded-xl border border-slate-200/70 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

          <p className="text-xs font-medium text-slate-400">
            جاري تحميل السائقين...
          </p>
        </div>
      )}

      {/* ----------------------------------------
       * Error
       * ---------------------------------------- */}

      {isError && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-8 text-center">
          <p className="text-xs font-medium text-red-600">
            {error instanceof Error
              ? error.message
              : "حدث خطأ أثناء تحميل السائقين"}
          </p>
        </div>
      )}

      {/* ----------------------------------------
       * Drivers
       * ---------------------------------------- */}

      {!isLoading && !isError && (
        <>
          {filteredDrivers.length > 0 ? (
            <DriversTable
              drivers={filteredDrivers}
              filter={filter}
              onEditDriver={(driver) => {
                setSelectedDriver(driver);
              }}
              onDeleteDriver={(driver) => {
                setDriverToDelete(driver);
              }}
            />
          ) : (
            <div className="rounded-xl border border-slate-200/70 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                —
              </div>

              <h3 className="text-sm font-bold text-slate-700">
                لا يوجد سائقون
              </h3>

              <p className="mt-1 text-[11px] text-slate-400">
                لا يوجد سائقون ضمن هذا التصنيف حاليًا.
              </p>
            </div>
          )}
        </>
      )}

      {/* ----------------------------------------
       * Add Driver Modal
       * ---------------------------------------- */}

      <AddDriverModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* ----------------------------------------
       * Edit Driver Modal
       * ---------------------------------------- */}

      <EditDriverModal
        isOpen={selectedDriver !== null}
        driver={selectedDriver}
        onClose={() => setSelectedDriver(null)}
      />

      {/* ----------------------------------------
       * Delete Driver Dialog
       * ---------------------------------------- */}

      <DeleteDriverDialog
        isOpen={driverToDelete !== null}
        driver={driverToDelete}
        onClose={() => setDriverToDelete(null)}
      />
    </div>
  );
}