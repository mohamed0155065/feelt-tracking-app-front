"use client";

import { useEffect, useState } from "react";
import {
    UserRound,
    X,
    Loader2,
} from "lucide-react";

import { useGetAllDrivers } from "@/features/drivers/hooks/useGetAllDrivers";
import { useAssignDriver } from "../hooks/useAssignDriver";

interface AssignDriverDialogProps {
    vehicleId: number;
    isOpen: boolean;
    onClose: () => void;
}

export function AssignDriverDialog({
    vehicleId,
    isOpen,
    onClose,
}: AssignDriverDialogProps) {
    const [driverId, setDriverId] = useState("");

    const {
        data: drivers = [],
        isLoading: isLoadingDrivers,
    } = useGetAllDrivers();

    const {
        mutate,
        isPending,
        isError,
        error,
        reset,
    } = useAssignDriver();

    useEffect(() => {
        if (!isOpen) {
            setDriverId("");
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!driverId) {
            return;
        }

        mutate(
            {
                vehicleId,
                driverId: Number(driverId),
            },
            {
                onSuccess: () => {
                    /**
                     * Close immediately after successful HTTP 200.
                     *
                     * No refetch.
                     * No waiting for another request.
                     * No dialog flicker.
                     */
                    onClose();
                },
            }
        );
    };

    return (
        <div
            dir="rtl"
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-slate-950/50
                p-4
                backdrop-blur-[2px]
            "
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    if (!isPending) {
                        onClose();
                    }
                }
            }}
        >
            <div
                className="
                    relative
                    w-full
                    max-w-md
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-2xl
                "
                onMouseDown={(event) => {
                    event.stopPropagation();
                }}
            >
                {/* Header */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-slate-100
                        px-6
                        py-5
                    "
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-50
                                text-blue-600
                            "
                        >
                            <UserRound className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                تعيين سائق
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                اختر السائق المسؤول عن هذه المركبة
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-slate-400
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6"
                >
                    <div>
                        <label
                            htmlFor="assign-driver"
                            className="
                                mb-2
                                block
                                text-xs
                                font-bold
                                text-slate-700
                            "
                        >
                            السائق
                        </label>

                        <select
                            id="assign-driver"
                            value={driverId}
                            onChange={(event) =>
                                setDriverId(event.target.value)
                            }
                            disabled={
                                isPending ||
                                isLoadingDrivers
                            }
                            className="
                                h-12
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-4
                                text-sm
                                font-medium
                                text-slate-800
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:bg-white
                                focus:ring-4
                                focus:ring-blue-500/10
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            <option value="">
                                {isLoadingDrivers
                                    ? "جاري تحميل السائقين..."
                                    : "اختر السائق"}
                            </option>

                            {drivers.map((driver) => (
                                <option
                                    key={driver.id}
                                    value={driver.id}
                                >
                                    {driver.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Error */}
                    {isError && (
                        <div
                            className="
                                mt-4
                                rounded-xl
                                border
                                border-red-100
                                bg-red-50
                                px-4
                                py-3
                                text-xs
                                font-medium
                                text-red-600
                            "
                        >
                            {error instanceof Error
                                ? error.message
                                : "حدث خطأ أثناء تعيين السائق. حاول مرة أخرى."}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">
                        <button
                            type="submit"
                            disabled={
                                isPending ||
                                !driverId ||
                                isLoadingDrivers
                            }
                            className="
                                flex
                                flex-1
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-blue-600
                                py-3
                                text-sm
                                font-bold
                                text-white
                                transition
                                hover:bg-blue-700
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
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

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-slate-600
                                transition
                                hover:bg-slate-50
                                disabled:opacity-50
                            "
                        >
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 