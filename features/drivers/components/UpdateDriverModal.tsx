"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useUpdateDriver } from "../hooks/useUpdateDriver";
import { DriverType } from "../types";
import { DriverPayload } from "../api/driverApi";

interface UpdateDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: DriverType;
}

export const UpdateDriverModal: React.FC<UpdateDriverModalProps> = ({
  isOpen,
  onClose,
  driver,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriverPayload>({
    defaultValues: {
      name: driver.name ?? "",
      email: driver.email ?? "",
      phone: driver.phone ?? "",
      vehicle: driver.vehicle ?? "",
    },
  });

  const {
    mutate: updateDriver,
    isPending,
  } = useUpdateDriver();

  /*
   * Update form values whenever:
   * - The modal opens
   * - A different driver is selected
   */
  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: driver.name ?? "",
      email: driver.email ?? "",
      phone: driver.phone ?? "",
      vehicle: driver.vehicle ?? "",
    });
  }, [driver, isOpen, reset]);

  const onSubmit = (data: DriverPayload) => {
    updateDriver(
      {
        id: driver.id,
        data,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 font-cairo text-start shadow-2xl animate-in zoom-in-95 duration-200">

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={isPending}
          className="absolute left-5 top-5 text-base text-slate-400 transition-colors hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="إغلاق"
        >
          ✕
        </button>

        {/* Header */}
        <div>
          <h3 className="text-base font-bold text-slate-900">
            تعديل بيانات السائق
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-400">
            قم بتعديل بيانات السائق ثم اضغط على حفظ التعديلات
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-5 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <div>
            <label
              htmlFor="driver-name"
              className="mb-1 block text-[11px] font-bold text-slate-500"
            >
              الاسم الكامل
            </label>

            <input
              id="driver-name"
              type="text"
              placeholder="محمد عبدالله"
              disabled={isPending}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 transition-colors focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="driver-email"
              className="mb-1 block text-[11px] font-bold text-slate-500"
            >
              البريد الإلكتروني
            </label>

            <input
              id="driver-email"
              type="email"
              placeholder="driver@fleet.sa"
              dir="ltr"
              disabled={isPending}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-right font-mono text-xs text-slate-800 transition-colors focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="driver-phone"
              className="mb-1 block text-[11px] font-bold text-slate-500"
            >
              رقم الهاتف
            </label>

            <input
              id="driver-phone"
              type="text"
              placeholder="+966 50 000 0000"
              dir="ltr"
              disabled={isPending}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-right font-mono text-xs text-slate-800 transition-colors focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              {...register("phone")}
            />

            {errors.phone && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Vehicle */}
          <div>
            <label
              htmlFor="driver-vehicle"
              className="mb-1 block text-[11px] font-bold text-slate-500"
            >
              تعيين مركبة
            </label>

            <select
              id="driver-vehicle"
              disabled={isPending}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-700 transition-colors focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              {...register("vehicle")}
            >
              <option value="">اختر مركبة...</option>

              <option value="أ ب ج 1234">
                أ ب ج 1234
              </option>

              <option value="د هـ و 5678">
                د هـ و 5678
              </option>
            </select>

            {errors.vehicle && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.vehicle.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "جاري التعديل..." : "تعديل بيانات السائق"}
            </button>

            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-500 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};