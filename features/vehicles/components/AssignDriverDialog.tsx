"use client";

import { useEffect, useState } from "react";
import {
    CheckCircle2,
    Loader2,
    UserRound,
    X,
} from "lucide-react";

import { useAssignDriver } from "../hooks/useAssginDriver";
import { useGetAllDrivers } from "@/features/drivers/hooks/useGetAllDrivers";

type Props = {
    vehicleId: number;
    currentDriverId?: number | null;
};

export function AssignDriverDialog({
    vehicleId,
    currentDriverId = null,
}: Props) {
    const [open, setOpen] = useState(false);
    const [driverId, setDriverId] = useState<number | null>(
        currentDriverId
    );

    const {
        data: drivers,
        isLoading: driversLoading,
    } = useGetAllDrivers();

    const {
        mutate,
        isPending,
        isError,
        isSuccess,
        reset,
    } = useAssignDriver();

    useEffect(() => {
        setDriverId(currentDriverId);
    }, [currentDriverId]);

    const handleClose = () => {
        if (isPending) return;

        setOpen(false);
        reset();
    };

    const handleAssign = () => {
        if (!driverId) return;

        mutate({
            vehicleId,
            driverId,
        });
    };

    return (
        <>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.99]"
            >
                <UserRound className="h-4 w-4" />

                {currentDriverId
                    ? "تغيير السائق"
                    : "تعيين سائق"}
            </button>

            {/* Overlay */}
            {open && (
                <div
                    dir="rtl"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            handleClose();
                        }
                    }}
                >
                    {/* Modal */}
                    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120] shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    {currentDriverId
                                        ? "تغيير السائق"
                                        : "تعيين سائق"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    اختر السائق المسؤول عن هذه المركبة
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isPending}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="space-y-5 p-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    السائق
                                </label>

                                <select
                                    value={driverId ?? ""}
                                    onChange={(event) => {
                                        const value =
                                            event.target.value;

                                        setDriverId(
                                            value
                                                ? Number(value)
                                                : null
                                        );

                                        reset();
                                    }}
                                    disabled={
                                        driversLoading ||
                                        isPending
                                    }
                                    className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">
                                        اختر السائق
                                    </option>

                                    {drivers?.map((driver) => (
                                        <option
                                            key={driver.id}
                                            value={driver.id}
                                        >
                                            {driver.name}
                                        </option>
                                    ))}
                                </select>

                                {driversLoading && (
                                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        جاري تحميل السائقين...
                                    </div>
                                )}
                            </div>

                            {/* Success */}
                            {isSuccess && (
                                <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />

                                    <p className="text-sm text-emerald-300">
                                        تم تعيين السائق بنجاح.
                                    </p>
                                </div>
                            )}

                            {/* Error */}
                            {isError && (
                                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                                    <p className="text-sm text-red-300">
                                        حدث خطأ أثناء تعيين السائق.
                                        حاول مرة أخرى.
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={isPending}
                                    className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="button"
                                    onClick={handleAssign}
                                    disabled={
                                        !driverId ||
                                        isPending ||
                                        driversLoading
                                    }
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            جاري الحفظ...
                                        </>
                                    ) : (
                                        "حفظ التعيين"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}