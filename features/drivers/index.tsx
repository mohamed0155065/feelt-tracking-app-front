"use client";

import React, { useMemo, useState } from "react";
import {
  Plus,
  Users,
  UserCheck,
  UserX,
  Search,
  ArrowUpRight,
} from "lucide-react";

import { DriversTable } from "./components/DriversTable";
import { AddDriverModal } from "./components/AddDriverModal";
import { DeleteDriverDialog } from "./components/DeleteDriverDialog";
import { EditDriverModal } from "./components/EditDriverModal";
import { useGetAllDrivers } from "./hooks/useGetAllDrivers";

import type { Driver } from "./components/DriversTable";

type DriverFilter = "all" | "active" | "inactive";

export default function DriversFeature() {
  /* ----------------------------------------
   * UI State
   * ---------------------------------------- */

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);

  const [filter, setFilter] = useState<DriverFilter>("all");
  const [search, setSearch] = useState("");

  /* ----------------------------------------
   * Fetch Drivers
   * ---------------------------------------- */

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetAllDrivers();

  /* ----------------------------------------
   * Normalize Backend Data
   * ---------------------------------------- */

  const drivers: Driver[] = useMemo(() => {
    return (Array.isArray(data) ? data : []).map((driver: Driver) => ({
      ...driver,
      is_active: Number(driver.is_active) === 1,
    }));
  }, [data]);

  /* ----------------------------------------
   * Statistics
   * ---------------------------------------- */

  const activeCount = drivers.filter(
    (driver) => driver.is_active
  ).length;

  const inactiveCount = drivers.length - activeCount;

  const activePercentage =
    drivers.length > 0
      ? Math.round((activeCount / drivers.length) * 100)
      : 0;

  /* ----------------------------------------
   * Filter + Search
   * ---------------------------------------- */

  const filteredDrivers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return drivers.filter((driver) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && driver.is_active) ||
        (filter === "inactive" && !driver.is_active);

      const matchesSearch =
        !normalizedSearch ||
        driver.name?.toLowerCase().includes(normalizedSearch) ||
        driver.email?.toLowerCase().includes(normalizedSearch) ||
        driver.phone?.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [drivers, filter, search]);

  /* ----------------------------------------
   * Render
   * ---------------------------------------- */

  return (
    <div dir="rtl" className="min-h-full bg-slate-50/50">
      <div className="space-y-7">

        {/* ========================================
            Header
        ======================================== */}

        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-blue-600">
              <Users className="h-4 w-4" />
              إدارة الموارد
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              السائقون
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              إدارة السائقين ومتابعة حالتهم وبياناتهم.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="
              inline-flex h-11 items-center justify-center gap-2
              rounded-xl
              bg-blue-600
              px-5
              text-sm font-semibold
              text-white
              shadow-sm
              shadow-blue-600/20
              transition-all
              hover:bg-blue-700
              hover:shadow-md
              hover:shadow-blue-600/20
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-blue-600/30
              focus:ring-offset-2
            "
          >
            <Plus className="h-4 w-4" />
            إضافة سائق
          </button>
        </header>

        {/* ========================================
            KPI / Statistics
        ======================================== */}

        <section aria-label="إحصائيات السائقين">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Total */}

            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    إجمالي السائقين
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                    {isLoading ? "—" : drivers.length}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                    جميع السائقين المسجلين
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-blue-50 opacity-50 blur-2xl transition-opacity group-hover:opacity-100" />
            </div>

            {/* Active */}

            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    السائقون النشطون
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                    {isLoading ? "—" : activeCount}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {activePercentage}% من إجمالي السائقين
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <UserCheck className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Inactive */}

            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    السائقون غير النشطين
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                    {isLoading ? "—" : inactiveCount}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    يحتاجون إلى مراجعة الحالة
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <UserX className="h-5 w-5" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================
            Main Data Section
        ======================================== */}

        <section
          aria-labelledby="drivers-list-heading"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >

          {/* Toolbar */}

          <div className="border-b border-slate-200 px-5 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2
                  id="drivers-list-heading"
                  className="text-sm font-bold text-slate-900"
                >
                  قائمة السائقين
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {filteredDrivers.length} سائق مطابق للنتائج الحالية
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Search */}

                <div className="relative">
                  <Search
                    className="
                      pointer-events-none
                      absolute right-3 top-1/2
                      h-4 w-4
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="ابحث عن سائق..."
                    className="
                      h-10
                      w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pr-9
                      pl-4
                      text-xs
                      text-slate-700
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-2
                      focus:ring-blue-500/10
                      sm:w-64
                    "
                  />
                </div>

              </div>
            </div>

            {/* Filters */}

            <div className="mt-5 flex items-center gap-1 overflow-x-auto">
              {[
                {
                  key: "all" as const,
                  label: "الكل",
                  count: drivers.length,
                },
                {
                  key: "active" as const,
                  label: "نشط",
                  count: activeCount,
                },
                {
                  key: "inactive" as const,
                  label: "غير نشط",
                  count: inactiveCount,
                },
              ].map((item) => {
                const isSelected = filter === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFilter(item.key)}
                    className={`
                      inline-flex h-9 shrink-0 items-center gap-2
                      rounded-lg
                      px-3
                      text-xs
                      font-medium
                      transition-all
                      ${
                        isSelected
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      }
                    `}
                  >
                    {item.label}

                    <span
                      className={`
                        rounded-md px-1.5 py-0.5 text-[10px] font-semibold
                        ${
                          isSelected
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading */}

          {isLoading && (
            <div className="flex min-h-[300px] flex-col items-center justify-center">
              <div
                className="
                  h-7 w-7 animate-spin
                  rounded-full
                  border-2
                  border-slate-200
                  border-t-blue-600
                "
              />

              <p className="mt-3 text-xs font-medium text-slate-400">
                جاري تحميل السائقين...
              </p>
            </div>
          )}

          {/* Error */}

          {isError && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                !
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-800">
                تعذر تحميل السائقين
              </p>

              <p className="mt-1 max-w-sm text-xs text-slate-400">
                {error instanceof Error
                  ? error.message
                  : "حدث خطأ أثناء الاتصال بالخادم."}
              </p>
            </div>
          )}

          {/* Table */}

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
                <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                    <Users className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-800">
                    لا توجد نتائج
                  </h3>

                  <p className="mt-1 max-w-sm text-xs text-slate-400">
                    لم نجد أي سائق يطابق البحث أو التصنيف المحدد.
                  </p>

                  {(search || filter !== "all") && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setFilter("all");
                      }}
                      className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      إعادة ضبط الفلاتر
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </section>

        {/* ========================================
            Modals
        ======================================== */}

        <AddDriverModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        <EditDriverModal
          isOpen={selectedDriver !== null}
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
        />

        <DeleteDriverDialog
          isOpen={driverToDelete !== null}
          driver={driverToDelete}
          onClose={() => setDriverToDelete(null)}
        />
      </div>
    </div>
  );
}