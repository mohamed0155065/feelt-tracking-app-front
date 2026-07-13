"use client";
import React, { useState } from "react";

// Mock data and type definition for BaseVehicle
interface BaseVehicle {
  id: string;
  plateNumber: string;
  model: string;
  year: number;
  status: "online" | "idle" | "offline";
  speed?: number;
}

const mockVehicles: BaseVehicle[] = [
  {
    id: "1",
    plateNumber: "ي ك ل 3456",
    model: "Nissan Urvan",
    year: 2020,
    status: "online",
    speed: 65,
  },
  {
    id: "2",
    plateNumber: "أ ب ج 1234",
    model: "Toyota Hiace",
    year: 2022,
    status: "online",
    speed: 42,
  },
  {
    id: "3",
    plateNumber: "د هـ و 5678",
    model: "Ford Transit",
    year: 2021,
    status: "idle",
  },
  {
    id: "4",
    plateNumber: "ز ح ط 9012",
    model: "Mercedes Sprinter",
    year: 2023,
    status: "offline",
  },
];

// Configuration for vehicle status badge styles
const statusConfig = {
  online: {
    border: "border-t-emerald-500",
    bg: "bg-emerald-50 text-emerald-600",
    label: "متصل",
  },
  idle: {
    border: "border-t-amber-500",
    bg: "bg-amber-50 text-amber-600",
    label: "خامل",
  },
  offline: {
    border: "border-t-slate-400",
    bg: "bg-slate-100 text-slate-600",
    label: "غير متصل",
  },
};

// --- VehiclesGrid Sub-Component ---
const VehiclesGrid: React.FC<{ vehicles: BaseVehicle[] }> = ({ vehicles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-1 animate-in fade-in duration-500">
      {vehicles.map((v, index) => {
        const config = statusConfig[v.status] || statusConfig.offline;
        return (
          <div
            key={v.id}
            className={`bg-white border border-slate-200 border-t-4 ${config.border} rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group animate-in slide-in-from-bottom-5`}
            style={{ animationDelay: `${index * 100}ms` }} // Staggered animation
          >
            <div>
              {/* Status and Speed Header */}
              <div className="flex justify-between items-center mb-2">
                {v.speed ? (
                  <span className="text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 font-mono transition-transform duration-300 group-hover:scale-105">
                    🧭 {v.speed} km/h
                  </span>
                ) : (
                  <span />
                )}
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    config.bg
                  } ${v.status === "online" ? "animate-pulse" : ""}`}
                >
                  ● {config.label}
                </span>
              </div>

              {/* Vehicle Visualization (Icon + Details) */}
              <div className="w-full bg-slate-50/80 rounded-xl py-6 flex flex-col items-center justify-center border border-slate-100 mb-3 overflow-hidden">
                <span className="text-5xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:translate-x-2">
                  🚛
                </span>
                <h3 className="font-bold text-base text-slate-800 mt-3 font-mono tracking-wide">
                  {v.plateNumber}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {v.model} • {v.year}
                </p>
              </div>

              {/* Assigned Driver (Mocked) */}
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100 mb-4 transition-colors duration-300 group-hover:bg-blue-50/30 group-hover:border-blue-100">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] transition-transform duration-300 group-hover:rotate-12">
                  م
                </div>
                <span className="text-xs text-slate-600 font-medium group-hover:text-blue-600 transition-colors">
                  محمد أحمد
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button className="text-xs py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-all duration-200 active:scale-95">
                📝 تعديل
              </button>
              <button className="text-xs py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-100 transition-all duration-200 font-medium active:scale-95 shadow-sm hover:shadow-blue-200">
                👥 تعيين
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- AddVehicleModal Sub-Component ---
const AddVehicleModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 transition-all duration-300 ease-out animate-in fade-in">
      {/* Modal Body with Animations */}
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative border border-slate-100 text-start font-cairo animate-in zoom-in-95 duration-200 slide-in-from-bottom-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 text-base"
        >
          ✕
        </button>

        <h3 className="text-base font-bold text-slate-900">إضافة مركبة جديدة</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          أدخل بيانات المركبة الجديدة للأسطول
        </p>

        {/* Input Form */}
        <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              رقم اللوحة
            </label>
            <input
              type="text"
              placeholder="أ ب ج 1234"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              نوع وموديل المركبة
            </label>
            <input
              type="text"
              placeholder="Toyota Hiace"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              سنة الصنع
            </label>
            <input
              type="number"
              placeholder="2024"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md active:scale-95 transition-all"
            >
              إضافة المركبة
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 font-bold text-xs py-3 rounded-xl active:scale-95 transition-all"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- VehiclesFeature (Main Exported Component) ---
export default function VehiclesFeature() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 flex-1 overflow-y-auto bg-[#F8FAFC]">
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm animate-in fade-in duration-300">
        <div>
          <h1 className="text-lg font-bold text-slate-800">المركبات</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            مركبة في الأسطول {mockVehicles.length}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>+</span> إضافة مركبة
        </button>
      </div>

      {/* Vehicles Grid and Modal in one file */}
      <VehiclesGrid vehicles={mockVehicles} />
      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}