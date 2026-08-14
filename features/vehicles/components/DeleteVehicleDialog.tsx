"use client";

import React from "react";
import { useDeleteVehicle } from "../hooks/useDeleteVehicle";
import type { Vehicle } from "../types/vehicle.types";

interface DeleteVehicleDialogProps {
    vehicle: Vehicle | null;
    isOpen: boolean;
    onClose: () => void;
}

export function DeleteVehicleDialog({
    vehicle,
    isOpen,
    onClose,
}: DeleteVehicleDialogProps) {
    const {
        mutate,
        isPending,
        isError,
        error,
    } = useDeleteVehicle();

    if (!isOpen || !vehicle) {
        return null;
    }

    const handleDelete = () => {
        mutate(vehicle.id, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-sm">
            <div
                dir="rtl"
                className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
            >
                <div className="mb-5">
                    <h3 className="text-lg font-bold text-slate-900">
                        حذف المركبة
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        هل أنت متأكد من حذف المركبة{" "}
                        <span className="font-bold text-slate-800">
                            {vehicle.plate_number}
                        </span>
                        ؟
                    </p>

                    <p className="mt-2 text-xs text-red-500">
                        لا يمكن التراجع عن هذا الإجراء.
                    </p>
                </div>

                {isError && (
                    <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-600">
                        {error instanceof Error
                            ? error.message
                            : "حدث خطأ أثناء حذف المركبة."}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {isPending
                            ? "جاري الحذف..."
                            : "حذف المركبة"}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    );
}