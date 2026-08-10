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

import React from "react";

export interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicleId?: string | null;
  vehicle?: string | null;
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
            {drivers.map((driver) => (
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

                <td className="px-4 py-3 text-xs text-slate-500">
                  {driver.vehicle ?? driver.vehicleId ?? "—"}
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
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};