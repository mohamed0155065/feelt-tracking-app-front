/**
 * Edit Driver Modal
 *
 * Displays the modal used to edit an existing driver.
 *
 * Responsibilities:
 *
 * - Displays the selected driver's current data.
 * - Allows changing any supported driver field.
 * - Uses the update-driver mutation.
 * - Closes the modal after successful update.
 *
 * Relationship with the application:
 *
 * - Receives the selected driver from DriversFeature.
 * - Uses DriverForm for the UI.
 * - Uses useUpdateDriver() for the mutation.
 * - Does not communicate directly with Laravel.
 */

"use client";

import React from "react";
import { useUpdateDriver } from "../hooks/useUpdateDriver";
import {
    DriverForm,
    type DriverFormData,
} from "./DriverForm";
import type { Driver } from "./DriversTable";

interface EditDriverModalProps {
    isOpen: boolean;
    driver: Driver | null;
    onClose: () => void;
}

export const EditDriverModal: React.FC<
    EditDriverModalProps
> = ({
    isOpen,
    driver,
    onClose,
}) => {
        const updateDriver = useUpdateDriver();

        if (!isOpen || !driver) {
            return null;
        }

        const initialData: Partial<DriverFormData> = {
            name: driver.name ?? "",
            email: driver.email ?? "",
            phone: driver.phone ?? "",
            password: "",
            vehicleId: driver.vehicleId
                ? String(driver.vehicleId)
                : "",
            is_active: driver.is_active ?? true,
        };

        const handleSubmit = (data: DriverFormData) => {
            updateDriver.mutate(
                {
                    id: driver.id,
                    data: {
                        name: data.name || undefined,
                        email: data.email || undefined,
                        phone: data.phone || undefined,
                        password: data.password || undefined,
                        vehicleId:
                            data.vehicleId || undefined,
                        is_active: data.is_active,
                    },
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
                className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/45
        px-4 py-6
        backdrop-blur-[3px]
      "
                dir="rtl"
                onMouseDown={onClose}
            >
                <div
                    className="
          relative
          w-full max-w-lg
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-2xl
          shadow-slate-950/10
        "
                    onMouseDown={(event) =>
                        event.stopPropagation()
                    }
                >
                    {/* Header */}

                    <div className="border-b border-slate-100 px-6 py-5">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={updateDriver.isPending}
                            className="
              absolute left-5 top-5
              flex h-8 w-8
              items-center justify-center
              rounded-lg
              text-slate-400
              transition-all
              hover:bg-slate-100
              hover:text-slate-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
                        >
                            ×
                        </button>

                        <div className="flex items-center gap-2.5">

                            <div
                                className="
                flex h-9 w-9
                items-center justify-center
                rounded-xl
                bg-blue-50
                text-blue-600
                ring-1 ring-blue-100
              "
                            >
                                ✎
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-slate-900">
                                    تعديل بيانات السائق
                                </h2>

                                <p className="mt-0.5 text-[11px] text-slate-400">
                                    عدّل البيانات التي تريد تغييرها
                                </p>
                            </div>
                        </div>
                    </div>

                    <DriverForm
                        mode="edit"
                        initialData={initialData}
                        isPending={updateDriver.isPending}
                        error={updateDriver.error}
                        onSubmit={handleSubmit}
                        onCancel={onClose}
                    />
                </div>
            </div>
        );
    };