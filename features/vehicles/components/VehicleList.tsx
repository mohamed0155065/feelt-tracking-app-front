"use client";

import { useState } from "react";
import {
    Pencil,
    Trash2,
    UserRound,
    CarFront,
    CalendarDays,
    UserPlus,
} from "lucide-react";

import { useVehicles } from "../hooks/useVehicles";
import { AssignDriverDialog } from "./AssignDriverDialog";
import { EditVehicleModal } from "./EditVehicleModal";
import { DeleteVehicleDialog } from "./DeleteVehicleDialog";

import type { Vehicle } from "../types/vehicle.types";

export default function VehicleList() {
    const {
        data: vehicles,
        isLoading,
        isError,
    } = useVehicles();

    const [editingVehicle, setEditingVehicle] =
        useState<Vehicle | null>(null);

    const [deletingVehicle, setDeletingVehicle] =
        useState<Vehicle | null>(null);

    /*
     * Loading
     */
    if (isLoading) {
        return (
            <div
                dir="rtl"
                className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
                    >
                        <div className="flex justify-between">
                            <div>
                                <div className="h-5 w-28 rounded bg-slate-200" />
                                <div className="mt-2 h-4 w-36 rounded bg-slate-100" />
                            </div>

                            <div className="h-7 w-16 rounded-full bg-slate-100" />
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="h-10 rounded-xl bg-slate-100" />
                            <div className="h-10 rounded-xl bg-slate-100" />
                        </div>

                        <div className="mt-5 h-10 rounded-xl bg-slate-100" />
                    </div>
                ))}
            </div>
        );
    }

    /*
     * Error
     */
    if (isError) {
        return (
            <div
                dir="rtl"
                className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center"
            >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <CarFront className="h-5 w-5 text-red-500" />
                </div>

                <h3 className="mt-3 text-sm font-bold text-red-700">
                    تعذر تحميل المركبات
                </h3>

                <p className="mt-1 text-xs text-red-500">
                    حدث خطأ أثناء جلب بيانات الأسطول.
                </p>
            </div>
        );
    }

    /*
     * Empty
     */
    if (!vehicles?.length) {
        return (
            <div
                dir="rtl"
                className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"
            >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                    <CarFront className="h-6 w-6 text-blue-600" />
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-800">
                    لا توجد مركبات
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                    لم تتم إضافة أي مركبات إلى الأسطول حتى الآن.
                </p>
            </div>
        );
    }

    return (
        <>
            <div
                dir="rtl"
                className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
                {vehicles.map((vehicle) => {
                    const hasDriver = Boolean(
                        vehicle.driver
                    );

                    return (
                        <article
                            key={vehicle.id}
                            className="
                                group
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                shadow-sm
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                hover:border-slate-300
                                hover:shadow-lg
                            "
                        >
                            {/* Top section */}
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div
                                            className="
                                                flex
                                                h-11
                                                w-11
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-blue-50
                                                text-blue-600
                                            "
                                        >
                                            <CarFront className="h-5 w-5" />
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="truncate text-sm font-bold text-slate-900">
                                                {
                                                    vehicle.plate_number
                                                }
                                            </h3>

                                            <p className="mt-1 truncate text-xs text-slate-400">
                                                {
                                                    vehicle.model
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* Type */}
                                    {vehicle.type && (
                                        <span
                                            className="
                                                shrink-0
                                                rounded-full
                                                bg-slate-100
                                                px-2.5
                                                py-1
                                                text-[10px]
                                                font-bold
                                                text-slate-600
                                            "
                                        >
                                            {
                                                vehicle.type
                                            }
                                        </span>
                                    )}
                                </div>

                                {/* Vehicle information */}
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    {/* Year */}
                                    <div className="rounded-xl bg-slate-50 p-3">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-slate-400" />

                                            <span className="text-[10px] font-medium text-slate-400">
                                                سنة الصنع
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm font-bold text-slate-700">
                                            {vehicle.year ||
                                                "غير محدد"}
                                        </p>
                                    </div>

                                    {/* Driver */}
                                    <div className="rounded-xl bg-slate-50 p-3">
                                        <div className="flex items-center gap-2">
                                            <UserRound className="h-4 w-4 text-slate-400" />

                                            <span className="text-[10px] font-medium text-slate-400">
                                                السائق
                                            </span>
                                        </div>

                                        <p
                                            className={`mt-2 truncate text-xs font-bold ${hasDriver
                                                    ? "text-slate-700"
                                                    : "text-amber-500"
                                                }`}
                                        >
                                            {hasDriver
                                                ? vehicle
                                                    .driver
                                                    ?.name
                                                : "غير معين"}
                                        </p>
                                    </div>
                                </div>

                                {/* Driver assignment */}
                                <div className="mt-4">
                                    <AssignDriverDialog
                                        vehicleId={
                                            vehicle.id
                                        }
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="border-t border-slate-100 bg-slate-50/70 p-3">
                                <div className="grid grid-cols-2 gap-2">
                                    {/* Edit */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEditingVehicle(
                                                vehicle
                                            )
                                        }
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-white
                                            px-3
                                            py-2.5
                                            text-xs
                                            font-bold
                                            text-slate-700
                                            transition
                                            hover:border-blue-200
                                            hover:bg-blue-50
                                            hover:text-blue-600
                                            active:scale-[0.98]
                                        "
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                        تعديل
                                    </button>

                                    {/* Delete */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDeletingVehicle(
                                                vehicle
                                            )
                                        }
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-red-100
                                            bg-white
                                            px-3
                                            py-2.5
                                            text-xs
                                            font-bold
                                            text-red-500
                                            transition
                                            hover:bg-red-50
                                            hover:border-red-200
                                            active:scale-[0.98]
                                        "
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        حذف
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Edit Modal */}
            <EditVehicleModal
                vehicle={editingVehicle}
                isOpen={Boolean(editingVehicle)}
                onClose={() =>
                    setEditingVehicle(null)
                }
            />

            {/* Delete Dialog */}
            <DeleteVehicleDialog
                vehicle={deletingVehicle}
                isOpen={Boolean(deletingVehicle)}
                onClose={() =>
                    setDeletingVehicle(null)
                }
            />
        </>
    );
}