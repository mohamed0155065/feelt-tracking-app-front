/**
 * Driver Form
 *
 * Shared form used for creating and editing drivers.
 *
 * Responsibilities:
 *
 * - Displays driver fields.
 * - Handles controlled form state.
 * - Handles validation through HTML form attributes.
 * - Supports both add and edit modes.
 * - Displays loading and API error states.
 *
 * Relationship with the application:
 *
 * - Used by AddDriverModal and EditDriverModal.
 * - Does not communicate directly with the backend.
 * - Does not know about React Query.
 */

"use client";

import React, { useEffect, useState } from "react";

export interface DriverFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    is_active: boolean;
}

interface DriverFormProps {
    mode: "add" | "edit";
    initialData?: Partial<DriverFormData>;
    isPending?: boolean;
    error?: unknown;
    onSubmit: (data: DriverFormData) => void;
    onCancel: () => void;
}

const defaultFormData: DriverFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    is_active: true,
};

export function DriverForm({
    mode,
    initialData,
    isPending = false,
    error,
    onSubmit,
    onCancel,
}: DriverFormProps) {
    const [formData, setFormData] =
        useState<DriverFormData>({
            ...defaultFormData,
            ...initialData,
        });

    useEffect(() => {
        setFormData({
            ...defaultFormData,
            ...initialData,
        });
    }, [initialData]);

    const isEditMode = mode === "edit";

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
        ...previous,
        [name]: value,
    }));
};

  
    const handleActiveChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((previous) => ({
            ...previous,
            is_active: event.target.checked,
        }));
    };

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        onSubmit(formData);
    };

    const inputClass = `
    h-10 w-full
    rounded-xl
    border border-slate-200
    bg-white
    px-3
    text-xs text-slate-800
    outline-none
    placeholder:text-slate-300
    transition-all
    hover:border-slate-300
    focus:border-blue-500
    focus:ring-4
    focus:ring-blue-500/5
    disabled:cursor-not-allowed
    disabled:bg-slate-50
    disabled:opacity-60
  `;

    const labelClass = `
    mb-1.5
    block
    text-[11px]
    font-semibold
    text-slate-600
  `;

    return (
        <form
            onSubmit={handleSubmit}
            className="
        max-h-[calc(100vh-180px)]
        overflow-y-auto
        px-6
        py-5
      "
        >
            <div className="space-y-5">

                {/* Driver Information */}

                <section>
                    <div className="mb-3">
                        <h3 className="text-xs font-bold text-slate-800">
                            بيانات السائق
                        </h3>

                        <p className="mt-1 text-[10px] text-slate-400">
                            {isEditMode
                                ? "قم بتعديل البيانات التي تريد تغييرها"
                                : "أدخل المعلومات الأساسية للسائق"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* Name */}

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="driver-name"
                                className={labelClass}
                            >
                                الاسم الكامل
                            </label>

                            <input
                                id="driver-name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="محمد عبدالله"
                                required={!isEditMode}
                                disabled={isPending}
                                autoComplete="name"
                                className={inputClass}
                            />
                        </div>

                        {/* Email */}

                        <div>
                            <label
                                htmlFor="driver-email"
                                className={labelClass}
                            >
                                البريد الإلكتروني
                            </label>

                            <input
                                id="driver-email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="driver@fleet.sa"
                                required={!isEditMode}
                                disabled={isPending}
                                autoComplete="email"
                                dir="ltr"
                                className={`${inputClass} text-left`}
                            />
                        </div>

                        {/* Phone */}

                        <div>
                            <label
                                htmlFor="driver-phone"
                                className={labelClass}
                            >
                                رقم الهاتف
                            </label>

                            <input
                                id="driver-phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+966 50 000 0000"
                                required={!isEditMode}
                                disabled={isPending}
                                autoComplete="tel"
                                dir="ltr"
                                className={`${inputClass} text-left`}
                            />
                        </div>

                        {/* Password */}

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="driver-password"
                                className={labelClass}
                            >
                                كلمة المرور
                            </label>

                            <input
                                id="driver-password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder={
                                    isEditMode
                                        ? "اتركها فارغة إذا لم ترد تغييرها"
                                        : "8 أحرف على الأقل"
                                }
                                required={!isEditMode}
                                minLength={isEditMode ? undefined : 8}
                                disabled={isPending}
                                autoComplete="new-password"
                                dir="ltr"
                                className={`${inputClass} text-left`}
                            />

                            <p className="mt-1.5 text-[10px] text-slate-400">
                                {isEditMode
                                    ? "يمكنك تغيير كلمة المرور فقط إذا أردت."
                                    : "يجب ألا تقل كلمة المرور عن 8 أحرف."}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Driver Settings */}

                <section className="border-t border-slate-100 pt-5">
                    <div className="mb-3">
                        <h3 className="text-xs font-bold text-slate-800">
                            إعدادات السائق
                        </h3>

                        <p className="mt-1 text-[10px] text-slate-400">
                            المركبة والحالة الحالية للسائق
                        </p>
                    </div>

                    <div className="space-y-4">

                        {/* Active Status */}

                        <div>
                            <label className={labelClass}>
                                حالة السائق
                            </label>

                            <label
                                className="
                  flex cursor-pointer
                  items-center justify-between
                  rounded-xl
                  border border-slate-200
                  bg-slate-50/70
                  px-4 py-3
                  transition-all
                  hover:border-emerald-200
                  hover:bg-emerald-50/40
                "
                            >
                                <div>
                                    <p className="text-xs font-semibold text-slate-700">
                                        السائق نشط
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                        يمكن للسائق استخدام النظام
                                    </p>
                                </div>

                                <input
                                    name="is_active"
                                    type="checkbox"
                                    checked={formData.is_active}
                                    onChange={handleActiveChange}
                                    disabled={isPending}
                                    className="
                    h-4 w-4
                    cursor-pointer
                    accent-emerald-500
                    disabled:cursor-not-allowed
                  "
                                />
                            </label>
                        </div>
                    </div>
                </section>

                {/* Error */}

                {error instanceof Error && (
                    <div
                        className="
              rounded-xl
              border border-red-100
              bg-red-50/70
              px-4 py-3
            "
                    >
                        <p className="text-[11px] font-medium leading-5 text-red-600">
                            {error.message}
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}

            <div className="mt-6 flex gap-3 border-t border-slate-100 pt-5">

                <button
                    type="submit"
                    disabled={isPending}
                    className="
            flex-1
            rounded-xl
            bg-blue-600
            py-2.5
            text-xs
            font-semibold
            text-white
            shadow-sm
            shadow-blue-600/10
            transition-all
            hover:bg-blue-700
            hover:shadow-md
            hover:shadow-blue-600/15
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
                >
                    {isPending
                        ? isEditMode
                            ? "جاري الحفظ..."
                            : "جاري الإضافة..."
                        : isEditMode
                            ? "حفظ التعديلات"
                            : "إضافة السائق"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isPending}
                    className="
            flex-1
            rounded-xl
            border border-slate-200
            bg-white
            py-2.5
            text-xs
            font-semibold
            text-slate-600
            transition-all
            hover:border-slate-300
            hover:bg-slate-50
            hover:text-slate-700
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
                >
                    إلغاء
                </button>
            </div>
        </form>
    );
}