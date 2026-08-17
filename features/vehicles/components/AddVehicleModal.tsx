"use client";

import React, {
  useEffect,
  useState,
} from "react";

import { Loader2, X } from "lucide-react";

import { useCreateVehicle } from "../hooks/useCreateVehicle";
import type { VehicleType } from "../types/vehicle.types";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Add Vehicle Modal
 *
 * Provides the form used to create a new vehicle.
 *
 * Responsibilities:
 * - Collects vehicle creation data.
 * - Performs client-side form validation.
 * - Executes useCreateVehicle().
 * - Displays mutation errors.
 * - Resets the form after successful creation.
 *
 * Relationship with the application:
 * - Opened by VehiclesFeature.
 * - Uses useCreateVehicle() for server mutations.
 * - React Query updates the vehicle list after creation.
 *
 * This component does not:
 * - Call Axios directly.
 * - Manage the vehicles cache.
 * - Contain backend communication logic.
 */

export function AddVehicleModal({
  isOpen,
  onClose,
}: AddVehicleModalProps) {
  const [plateNumber, setPlateNumber] =
    useState("");

  const [model, setModel] = useState("");

  const [year, setYear] = useState("");

  const [type, setType] =
    useState<VehicleType>("truck");

  const [validationError, setValidationError] =
    useState("");

  const {
    mutate,
    isPending,
    isError,
    error,
    reset,
  } = useCreateVehicle();

  const currentYear =
    new Date().getFullYear();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        !isPending
      ) {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, isPending, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setValidationError("");
    reset();

    const trimmedPlate =
      plateNumber.trim();

    const trimmedModel =
      model.trim();

    const trimmedYear =
      year.trim();

    if (!trimmedPlate) {
      setValidationError(
        "رقم اللوحة مطلوب."
      );
      return;
    }

    if (!trimmedModel) {
      setValidationError(
        "موديل المركبة مطلوب."
      );
      return;
    }

    let parsedYear: number | undefined;

    if (trimmedYear) {
      parsedYear = Number(trimmedYear);

      if (
        !Number.isInteger(parsedYear) ||
        parsedYear < 1900 ||
        parsedYear > currentYear + 1
      ) {
        setValidationError(
          `سنة الصنع يجب أن تكون بين 1900 و ${currentYear + 1}.`
        );
        return;
      }
    }

    mutate(
      {
        plate_number: trimmedPlate,
        model: trimmedModel,
        type,
        year: parsedYear,
      },
      {
        onSuccess: () => {
          setPlateNumber("");
          setModel("");
          setYear("");
          setType("truck");
          setValidationError("");

          onClose();
        },
      }
    );
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget &&
          !isPending
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-vehicle-title"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2
              id="add-vehicle-title"
              className="text-base font-bold text-slate-900"
            >
              إضافة مركبة جديدة
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              أضف بيانات المركبة إلى الأسطول
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="إغلاق"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6"
        >
          <div>
            <label
              htmlFor="vehicle-plate-number"
              className="mb-1.5 block text-xs font-bold text-slate-600"
            >
              رقم اللوحة
            </label>

            <input
              id="vehicle-plate-number"
              type="text"
              value={plateNumber}
              onChange={(event) =>
                setPlateNumber(
                  event.target.value
                )
              }
              placeholder="أ ب ج 1234"
              disabled={isPending}
              autoFocus
              required
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="vehicle-model"
              className="mb-1.5 block text-xs font-bold text-slate-600"
            >
              الموديل
            </label>

            <input
              id="vehicle-model"
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
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="vehicle-type"
              className="mb-1.5 block text-xs font-bold text-slate-600"
            >
              نوع المركبة
            </label>

            <select
              id="vehicle-type"
              value={type}
              onChange={(event) =>
                setType(
                  event.target
                    .value as VehicleType
                )
              }
              disabled={isPending}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
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

          <div>
            <label
              htmlFor="vehicle-year"
              className="mb-1.5 block text-xs font-bold text-slate-600"
            >
              سنة الصنع
              <span className="mr-1 font-normal text-slate-400">
                (اختياري)
              </span>
            </label>

            <input
              id="vehicle-year"
              type="number"
              value={year}
              onChange={(event) =>
                setYear(
                  event.target.value
                )
              }
              min={1900}
              max={currentYear + 1}
              disabled={isPending}
              placeholder={String(
                currentYear
              )}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
            />
          </div>

          {(validationError ||
            isError) && (
              <div
                role="alert"
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-600"
              >
                {validationError ||
                  (error instanceof Error
                    ? error.message
                    : "حدث خطأ أثناء إضافة المركبة.")}
              </div>
            )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={
                isPending ||
                !plateNumber.trim() ||
                !model.trim()
              }
              className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الإضافة...
                </>
              ) : (
                "إضافة المركبة"
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="min-h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}