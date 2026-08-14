"use client";

import { useMemo, useState } from "react";
import { Plus, CarFront, Users, UserX } from "lucide-react";

import VehicleList from "@/features/vehicles/components/VehicleList";
import { AddVehicleModal } from "@/features/vehicles/components/AddVehicleModal";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";

export default function VehiclesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const {
    data: vehicles = [],
    isLoading,
  } = useVehicles();

  const statistics = useMemo(() => {
    const total = vehicles.length;

    const assigned = vehicles.filter(
      (vehicle) => Boolean(vehicle.driver)
    ).length;

    const withoutDriver = total - assigned;

    return {
      total,
      assigned,
      withoutDriver,
    };
  }, [vehicles]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <header className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <CarFront className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  إدارة المركبات
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  إدارة أسطول المركبات والسائقين
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition-all
                hover:bg-blue-700
                hover:shadow-blue-600/30
                active:scale-[0.98]
              "
            >
              <Plus className="h-4 w-4" />
              إضافة مركبة
            </button>

          </div>
        </header>

        {/* ================= STATISTICS ================= */}

        <section className="mb-8">

          <div className="mb-4">
            <h2 className="text-sm font-bold text-slate-800">
              نظرة عامة
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              ملخص حالة المركبات في الأسطول
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Total */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    إجمالي المركبات
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {isLoading ? "—" : statistics.total}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <CarFront className="h-5 w-5 text-blue-600" />
                </div>

              </div>
            </div>

            {/* Assigned */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    مركبات بسائق
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {isLoading ? "—" : statistics.assigned}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>

              </div>
            </div>

            {/* Without Driver */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    بدون سائق
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {isLoading ? "—" : statistics.withoutDriver}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                  <UserX className="h-5 w-5 text-amber-500" />
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ================= VEHICLES ================= */}

        <section>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                المركبات
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                جميع المركبات المسجلة في الأسطول
              </p>
            </div>

            {!isLoading && (
              <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-sm ring-1 ring-slate-200">
                {statistics.total} مركبة
              </span>
            )}

          </div>

          <VehicleList />

        </section>

      </div>

      {/* ================= ADD VEHICLE MODAL ================= */}

      <AddVehicleModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

    </main>
  );
}