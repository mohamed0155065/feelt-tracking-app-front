"use client";

import React, { useEffect, useState } from "react";
import {
    CarFront,
    X,
    Save,
    Loader2,
} from "lucide-react";

import { useUpdateVehicle } from "../hooks/useUpdateVehicle";
import type { Vehicle } from "../types/vehicle.types";

interface EditVehicleModalProps {
    isOpen: boolean;
    vehicle: Vehicle | null;
    onClose: () => void;
}

type UpdateVehiclePayload = {
    plate_number?: string;
    model?: string;
    type?: string;
    year?: number;
};

export const EditVehicleModal: React.FC<
    EditVehicleModalProps
> = ({
    isOpen,
    vehicle,
    onClose,
}) => {
        const [plateNumber, setPlateNumber] = useState("");
        const [model, setModel] = useState("");
        const [type, setType] = useState("");
        const [year, setYear] = useState("");

        const {
            mutate,
            isPending,
            isError,
            error,
        } = useUpdateVehicle();

        useEffect(() => {
            if (!vehicle || !isOpen) return;

            setPlateNumber(vehicle.plate_number ?? "");
            setModel(vehicle.model ?? "");
            setType(vehicle.type ?? "");
            setYear(
                vehicle.year !== null &&
                    vehicle.year !== undefined
                    ? String(vehicle.year)
                    : ""
            );
        }, [vehicle, isOpen]);

        if (!isOpen || !vehicle) {
            return null;
        }

        const handleSubmit = (
            event: React.FormEvent<HTMLFormElement>
        ) => {
            event.preventDefault();

            const payload: UpdateVehiclePayload = {};

            const trimmedPlate = plateNumber.trim();
            const trimmedModel = model.trim();
            const trimmedType = type.trim();
            const trimmedYear = year.trim();

            /*
             * Only send fields that have values.
             * Every field is optional.
             */

            if (trimmedPlate) {
                payload.plate_number = trimmedPlate;
            }

            if (trimmedModel) {
                payload.model = trimmedModel;
            }

            if (trimmedType) {
                payload.type = trimmedType;
            }

            if (trimmedYear) {
                const parsedYear = Number(trimmedYear);

                if (Number.isInteger(parsedYear)) {
                    payload.year = parsedYear;
                }
            }

            /*
             * Nothing to update.
             */
            if (Object.keys(payload).length === 0) {
                return;
            }

            mutate(
                {
                    id: vehicle.id,
                    ...payload,
                },
                {
                    onSuccess: () => {
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
            "
            >
                {/* ================= OVERLAY ================= */}

                <div
                    className="
                    absolute
                    inset-0
                    bg-slate-950/50
                    backdrop-blur-sm
                "
                    onClick={() => {
                        if (!isPending) {
                            onClose();
                        }
                    }}
                />

                {/* ================= MODAL ================= */}

                <div
                    className="
                    relative
                    z-10
                    flex
                    min-h-full
                    items-center
                    justify-center
                    p-4
                "
                >
                    <div
                        className="
                        relative
                        w-full
                        max-w-lg
                        overflow-hidden
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        shadow-2xl
                        animate-in
                        fade-in
                        zoom-in-95
                    "
                    >
                        {/* ================= HEADER ================= */}

                        <div
                            className="
                            border-b
                            border-slate-100
                            px-6
                            py-5
                        "
                        >
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isPending}
                                className="
                                absolute
                                left-5
                                top-5
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
                                disabled:opacity-50
                            "
                                aria-label="إغلاق"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <div className="flex items-center gap-3">

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

                                <div>
                                    <h2 className="text-base font-bold text-slate-900">
                                        تعديل بيانات المركبة
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-400">
                                        يمكنك تحديث أي بيانات تريدها
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* ================= FORM ================= */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-6"
                        >
                            <div className="space-y-5">

                                {/* Plate */}

                                <div>
                                    <label
                                        htmlFor="edit-plate-number"
                                        className="
                                        mb-2
                                        block
                                        text-xs
                                        font-bold
                                        text-slate-600
                                    "
                                    >
                                        رقم اللوحة
                                        <span className="mr-1 font-normal text-slate-400">
                                            (اختياري)
                                        </span>
                                    </label>

                                    <input
                                        id="edit-plate-number"
                                        type="text"
                                        value={plateNumber}
                                        onChange={(event) =>
                                            setPlateNumber(
                                                event.target.value
                                            )
                                        }
                                        disabled={isPending}
                                        placeholder="أ ب ج 1234"
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
                                        placeholder:text-slate-400
                                        focus:border-blue-500
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-blue-500/10
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                    />
                                </div>

                                {/* Model */}

                                <div>
                                    <label
                                        htmlFor="edit-model"
                                        className="
                                        mb-2
                                        block
                                        text-xs
                                        font-bold
                                        text-slate-600
                                    "
                                    >
                                        الموديل
                                        <span className="mr-1 font-normal text-slate-400">
                                            (اختياري)
                                        </span>
                                    </label>

                                    <input
                                        id="edit-model"
                                        type="text"
                                        value={model}
                                        onChange={(event) =>
                                            setModel(
                                                event.target.value
                                            )
                                        }
                                        disabled={isPending}
                                        placeholder="Toyota Hilux"
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
                                        placeholder:text-slate-400
                                        focus:border-blue-500
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-blue-500/10
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                    />
                                </div>

                                {/* Type + Year */}

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    {/* Type */}

                                    <div>
                                        <label
                                            htmlFor="edit-type"
                                            className="
                                            mb-2
                                            block
                                            text-xs
                                            font-bold
                                            text-slate-600
                                        "
                                        >
                                            نوع المركبة
                                            <span className="mr-1 font-normal text-slate-400">
                                                (اختياري)
                                            </span>
                                        </label>

                                        <select
                                            id="edit-type"
                                            value={type}
                                            onChange={(event) =>
                                                setType(
                                                    event.target.value
                                                )
                                            }
                                            disabled={isPending}
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
                                            disabled:opacity-60
                                        "
                                        >
                                            <option value="">
                                                اختر النوع
                                            </option>

                                            <option value="truck">
                                                شاحنة
                                            </option>

                                            <option value="van">
                                                فان
                                            </option>

                                            <option value="car">
                                                سيارة
                                            </option>

                                            <option value="bus">
                                                أتوبيس
                                            </option>
                                        </select>
                                    </div>

                                    {/* Year */}

                                    <div>
                                        <label
                                            htmlFor="edit-year"
                                            className="
                                            mb-2
                                            block
                                            text-xs
                                            font-bold
                                            text-slate-600
                                        "
                                        >
                                            سنة الصنع
                                            <span className="mr-1 font-normal text-slate-400">
                                                (اختياري)
                                            </span>
                                        </label>

                                        <input
                                            id="edit-year"
                                            type="number"
                                            value={year}
                                            onChange={(event) =>
                                                setYear(
                                                    event.target.value
                                                )
                                            }
                                            disabled={isPending}
                                            min="1900"
                                            max={
                                                new Date().getFullYear() + 1
                                            }
                                            placeholder="2024"
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
                                            placeholder:text-slate-400
                                            focus:border-blue-500
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-blue-500/10
                                            disabled:opacity-60
                                        "
                                        />
                                    </div>

                                </div>

                                {/* Error */}

                                {isError && (
                                    <div
                                        className="
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
                                            : "حدث خطأ أثناء تحديث المركبة."}
                                    </div>
                                )}

                            </div>

                            {/* ================= ACTIONS ================= */}

                            <div className="mt-7 flex gap-3">

                                <button
                                    type="submit"
                                    disabled={isPending}
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
                                    shadow-lg
                                    shadow-blue-600/20
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
                                        <>
                                            <Save className="h-4 w-4" />
                                            حفظ التعديلات
                                        </>
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
                                    active:scale-[0.98]
                                    disabled:opacity-50
                                "
                                >
                                    إلغاء
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };