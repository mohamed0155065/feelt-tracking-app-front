/**
 * Drivers Table
 *
 * Displays all drivers returned from the backend.
 *
 * Responsibilities:
 *
 * - Renders the drivers list.
 * - Displays driver information.
 * - Allows the user to select a driver for editing.
 * - Allows the user to delete a driver.
 * - Highlights the driver's active status.
 *
 * Relationship with the application:
 *
 * - Receives drivers from DriversFeature.
 * - Calls onEditDriver() when the edit button is clicked.
 * - Calls onDeleteDriver() when the delete button is clicked.
 * - Does not communicate directly with the backend.
 */

"use client";

import React, { useMemo } from "react";
import { CarFront } from "lucide-react";

import { useVehicles } from "@/features/vehicles/hooks/useVehicles";

export interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
}

interface DriversTableProps {
  drivers: Driver[];
  filter: "all" | "active" | "inactive";
  onEditDriver: (driver: Driver) => void;
  onDeleteDriver: (driver: Driver) => void;
}

export const DriversTable: React.FC<DriversTableProps> = ({
  drivers,
  onEditDriver,
  onDeleteDriver,
}) => {
  /**
   * Vehicles are the single source of truth for the
   * driver <-> vehicle relationship. We derive each
   * driver's vehicle from vehicle.driver_id instead of
   * relying on any vehicle field coming from the drivers
   * endpoint itself.
   */
  const { data: vehicles = [] } = useVehicles();

  const vehicleByDriverId = useMemo(
    () =>
      new Map(
        vehicles
          .filter((vehicle) => vehicle.driver_id !== null && vehicle.driver_id !== undefined)
          .map((vehicle) => [vehicle.driver_id as number, vehicle])
      ),
    [vehicles]
  );

  if (drivers.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-sm text-slate-400">
          لا يوجد سائقون
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-right">

          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                السائق
              </th>

              <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                البريد الإلكتروني
              </th>

              <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                الهاتف
              </th>

              <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                المركبة
              </th>

              <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                الحالة
              </th>

              <th className="px-4 py-3 text-[11px] font-bold text-slate-500">
                الإجراءات
              </th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((driver) => {
              const vehicle = vehicleByDriverId.get(driver.id);

              return (
              <tr
                key={driver.id}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50/70"
              >

                {/* Driver */}

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                      {driver.name?.charAt(0)}
                    </div>

                    <span className="text-xs font-bold text-slate-700">
                      {driver.name}
                    </span>

                  </div>
                </td>

                {/* Email */}

                <td className="px-4 py-3 text-xs text-slate-500">
                  {driver.email}
                </td>

                {/* Phone */}

                <td
                  className="px-4 py-3 text-xs text-slate-500"
                  dir="ltr"
                >
                  {driver.phone}
                </td>

                {/* Vehicle */}

                <td className="px-4 py-3">
                  {vehicle ? (
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <CarFront className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-700">
                          {vehicle.plate_number}
                        </p>

                        {vehicle.model && (
                          <p className="truncate text-[10px] text-slate-400">
                            {vehicle.model}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-amber-500">
                      غير معينة
                    </span>
                  )}
                </td>

                {/* Status */}

                <td className="px-4 py-3">
                  {driver.is_active ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                      <span>●</span>
                      نشط
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-400">
                      <span>●</span>
                      غير نشط
                    </span>
                  )}
                </td>

                {/* Actions */}

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">

                    {/* Edit */}

                    <button
                      type="button"
                      onClick={() => onEditDriver(driver)}
                      className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-600 transition-colors hover:bg-blue-100"
                    >
                      تعديل
                    </button>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() => onDeleteDriver(driver)}
                      className="rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-[10px] font-bold text-red-600 transition-colors hover:bg-red-100"
                    >
                      حذف
                    </button>

                  </div>
                </td>

              </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
};