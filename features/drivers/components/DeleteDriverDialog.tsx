/**
 * Delete Driver Dialog
 *
 * Displays a confirmation dialog before deleting a driver.
 *
 * Responsibilities:
 *
 * - Shows the selected driver's information.
 * - Asks the user to confirm deletion.
 * - Executes the delete mutation.
 * - Displays loading and error states.
 * - Closes after successful deletion.
 *
 * Relationship with the application:
 *
 * - Uses useDeleteDriver().
 * - Receives the selected driver from DriversFeature.
 * - Does not communicate directly with Laravel.
 */

"use client";

import React from "react";
import { useDeleteDriver } from "../hooks/useDeleteDriver";
import type { Driver } from "./DriversTable";

interface DeleteDriverDialogProps {
    isOpen: boolean;
    driver: Driver | null;
    onClose: () => void;
}

export const DeleteDriverDialog: React.FC<
    DeleteDriverDialogProps
> = ({ isOpen, driver, onClose }) => {
    const deleteDriver = useDeleteDriver();

    if (!isOpen || !driver) {
        return null;
    }

    const handleDelete = () => {
        deleteDriver.mutate(driver.id, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-[2px]"
            dir="rtl"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Top Accent */}
                <div className="h-1 w-full bg-red-500" />

                <div className="p-6">
                    {/* Icon */}
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <span className="text-lg">!</span>
                    </div>

                    {/* Header */}
                    <div className="mb-5">
                        <h3 className="text-sm font-bold text-slate-800">
                            حذف السائق
                        </h3>

                        <p className="mt-2 text-xs leading-6 text-slate-500">
                            هل أنت متأكد أنك تريد حذف السائق{" "}
                            <span className="font-bold text-slate-800">
                                {driver.name}
                            </span>
                            ؟
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                            هذا الإجراء لا يمكن التراجع عنه.
                        </p>
                    </div>

                    {/* Driver Info */}
                    <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">
                                البريد الإلكتروني
                            </span>

                            <span
                                dir="ltr"
                                className="max-w-[200px] truncate text-[10px] font-medium text-slate-600"
                            >
                                {driver.email}
                            </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">
                                رقم الهاتف
                            </span>

                            <span
                                dir="ltr"
                                className="text-[10px] font-medium text-slate-600"
                            >
                                {driver.phone}
                            </span>
                        </div>
                    </div>

                    {/* Error */}
                    {deleteDriver.isError && (
                        <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3">
                            <p className="text-[11px] font-medium leading-5 text-red-600">
                                {deleteDriver.error instanceof Error
                                    ? deleteDriver.error.message
                                    : "حدث خطأ أثناء حذف السائق"}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2.5 border-t border-slate-100 pt-5">
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleteDriver.isPending}
                            className="flex-1 rounded-xl bg-red-600 py-3 text-xs font-bold text-white shadow-sm shadow-red-600/10 transition-all hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {deleteDriver.isPending
                                ? "جاري الحذف..."
                                : "نعم، حذف السائق"}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={deleteDriver.isPending}
                            className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            إلغاء
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};