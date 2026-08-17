"use client";

import { useState } from "react";

import {
  Plus,
  CarFront,
} from "lucide-react";

import { AddVehicleModal } from "./components/AddVehicleModal";
import VehicleList from "./components/VehicleList";
import { useVehicles } from "./hooks/useVehicles";

/**
 * Vehicles Feature
 *
 * Provides the main vehicle-management experience.
 *
 * Responsibilities:
 * - Displays the Vehicles page header.
 * - Displays the current vehicle count.
 * - Opens the create vehicle modal.
 * - Renders the server-backed vehicle list.
 *
 * Relationship with the application:
 * - Uses useVehicles() for server state.
 * - Uses VehicleList for vehicle rendering and CRUD actions.
 * - Uses AddVehicleModal for vehicle creation.
 * - React Query mutations synchronize vehicle data.
 *
 * This component does not:
 * - Contain mock vehicle data.
 * - Call APIs directly.
 * - Manage the vehicle cache manually.
 */

export default function VehiclesFeature() {
  const [
    isAddModalOpen,
    setIsAddModalOpen,
  ] = useState(false);

  const {
    data: vehicles = [],
    isLoading,
  } = useVehicles();

  return (
    <section
      dir="rtl"
      className="flex min-h-full flex-1 flex-col gap-5 bg-slate-50 p-4 sm:p-6"
    >
      <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CarFront className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                المركبات
              </h1>

              <p className="mt-1 text-xs text-slate-500">
                إدارة مركبات الأسطول

                {!isLoading && (
                  <>
                    {" "}
                    ·{" "}
                    {vehicles.length}{" "}
                    مركبة
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setIsAddModalOpen(true)
            }
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />

            إضافة مركبة
          </button>
        </div>
      </header>

      <main className="flex-1">
        <VehicleList />
      </main>

      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() =>
          setIsAddModalOpen(false)
        }
      />
    </section>
  );
}