/**
 * Add Driver Modal
 *
 * Displays the modal used to create a new driver.
 *
 * Responsibilities:
 *
 * - Controls the add-driver modal container.
 * - Uses useAddDriver() to create the driver.
 * - Provides initial form data to DriverForm.
 * - Closes the modal after successful creation.
 *
 * Relationship with the application:
 *
 * - Uses DriverForm for the UI.
 * - Uses useAddDriver() for the mutation.
 * - Does not communicate directly with Laravel.
 */

"use client";

import React from "react";
import { useAddDriver } from "../hooks/useAddDriver";
import {
  DriverForm,
  type DriverFormData,
} from "./DriverForm"
interface AddDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDriverModal: React.FC<
  AddDriverModalProps
> = ({ isOpen, onClose }) => {
  const addDriver = useAddDriver();

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (data: DriverFormData) => {
    addDriver.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
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
            disabled={addDriver.isPending}
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
              +
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                إضافة سائق جديد
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-400">
                أدخل بيانات السائق لإضافته إلى النظام
              </p>
            </div>
          </div>
        </div>

        <DriverForm
          mode="add"
          isPending={addDriver.isPending}
          error={addDriver.error}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};