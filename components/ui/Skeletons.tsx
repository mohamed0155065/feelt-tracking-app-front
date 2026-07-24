import React from 'react';

// 1. هيكل كارت المركبات النابض
export const VehicleCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm animate-pulse space-y-4">
    <div className="flex justify-between items-center">
      <div className="w-16 h-4 bg-slate-200 rounded-md" />
      <div className="w-12 h-4 bg-slate-200 rounded-full" />
    </div>
    <div className="w-full bg-slate-100 rounded-xl h-28 flex flex-col items-center justify-center gap-2">
      <div className="w-10 h-10 bg-slate-200 rounded-full" />
      <div className="w-24 h-4 bg-slate-200 rounded-md" />
    </div>
    <div className="w-full h-8 bg-slate-100 rounded-lg" />
    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
      <div className="h-8 bg-slate-200 rounded-lg" />
      <div className="h-8 bg-slate-200 rounded-lg" />
    </div>
  </div>
);

// 2. هيكل جدول السائقين
export const DriverTableSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
    <div className="bg-slate-100 h-10 w-full" />
    <div className="divide-y divide-slate-100">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="w-24 h-4 bg-slate-200 rounded-md" />
          </div>
          <div className="w-32 h-4 bg-slate-100 rounded-md hidden md:block" />
          <div className="w-24 h-4 bg-slate-100 rounded-md hidden sm:block" />
          <div className="w-16 h-5 bg-slate-200 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);