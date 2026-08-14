"use client";

import React, { useState } from "react";
import { useCreateVehicle } from "../hooks/useCreateVehicle";
import type { VehicleType } from "../types/vehicle.types";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddVehicleModal: React.FC<
  AddVehicleModalProps
> = ({ isOpen, onClose }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] =
    useState<VehicleType>("truck");

  const {
    mutate,
    isPending,
    isError,
    error,
  } = useCreateVehicle();

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedPlate = plateNumber.trim();
    const trimmedModel = model.trim();

    if (!trimmedPlate || !trimmedModel) {
      return;
    }

    mutate(
      {
        plate_number: trimmedPlate,
        model: trimmedModel,
        type,
        year: year
          ? Number(year)
          : undefined,
      },
      {
        onSuccess: () => {
          setPlateNumber("");
          setModel("");
          setType("truck");
          setYear("");

          onClose();
        },
      }
    );
  };

  return (
    <div
      className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-zinc-950/60
                backdrop-blur-sm
                p-4
                animate-in fade-in
            "
    >
      <div
        dir="rtl"
        className="
                    relative w-full max-w-md
                    rounded-3xl
                    bg-white
                    p-6
                    shadow-2xl
                    animate-in
                    zoom-in-95
                    slide-in-from-bottom-4
                "
      >
        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="
                        absolute left-5 top-5
                        text-slate-400
                        transition
                        hover:text-slate-700
                        disabled:opacity-50
                    "
          aria-label="إغلاق"
        >
          ✕
        </button>

        {/* Header */}

        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            إضافة مركبة جديدة
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            أضف بيانات المركبة إلى الأسطول
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Plate */}

          <div>
            <label
              htmlFor="plate_number"
              className="
                                mb-1.5
                                block
                                text-xs
                                font-bold
                                text-slate-600
                            "
            >
              رقم اللوحة
            </label>

            <input
              id="plate_number"
              type="text"
              value={plateNumber}
              onChange={(event) =>
                setPlateNumber(
                  event.target.value
                )
              }
              placeholder="أ ب ج 1234"
              disabled={isPending}
              required
              className="
                                w-full
                                rounded-xl
                                border border-slate-200
                                bg-slate-50
                                px-4 py-3
                                text-sm
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
              htmlFor="model"
              className="
                                mb-1.5
                                block
                                text-xs
                                font-bold
                                text-slate-600
                            "
            >
              الموديل
            </label>

            <input
              id="model"
              type="text"
              value={model}
              onChange={(event) =>
                setModel(
                  event.target.value
                )
              }
              placeholder="Toyota Hilux"
              disabled={isPending}
              required
              className="
                                w-full
                                rounded-xl
                                border border-slate-200
                                bg-slate-50
                                px-4 py-3
                                text-sm
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

          {/* Type */}

          <div>
            <label
              htmlFor="type"
              className="
                                mb-1.5
                                block
                                text-xs
                                font-bold
                                text-slate-600
                            "
            >
              نوع المركبة
            </label>

            <select
              id="type"
              value={type}
              onChange={(event) =>
                setType(
                  event.target
                    .value as VehicleType
                )
              }
              disabled={isPending}
              className="
                                w-full
                                rounded-xl
                                border border-slate-200
                                bg-slate-50
                                px-4 py-3
                                text-sm
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
                حافلة
              </option>
            </select>
          </div>

          {/* Year */}

          <div>
            <label
              htmlFor="year"
              className="
                                mb-1.5
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
              id="year"
              type="number"
              value={year}
              onChange={(event) =>
                setYear(
                  event.target.value
                )
              }
              placeholder="2024"
              min="1900"
              max={
                new Date().getFullYear() + 1
              }
              disabled={isPending}
              className="
                                w-full
                                rounded-xl
                                border border-slate-200
                                bg-slate-50
                                px-4 py-3
                                text-sm
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

          {/* Error */}

          {isError && (
            <div
              className="
                                rounded-xl
                                border border-red-100
                                bg-red-50
                                px-4 py-3
                                text-xs
                                text-red-600
                            "
            >
              {error instanceof Error
                ? error.message
                : "حدث خطأ أثناء حفظ بيانات المركبة."}
            </div>
          )}

          {/* Actions */}

          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              disabled={
                isPending ||
                !plateNumber.trim() ||
                !model.trim()
              }
              className="
                                flex-1
                                rounded-xl
                                bg-blue-600
                                py-3
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                shadow-blue-500/20
                                transition
                                hover:bg-blue-700
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
            >
              {isPending
                ? "جاري الإضافة..."
                : "إضافة المركبة"}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="
                                rounded-xl
                                border border-slate-200
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
  );
};