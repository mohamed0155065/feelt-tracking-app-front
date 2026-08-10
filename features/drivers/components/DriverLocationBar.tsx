/**
 * المكون: شريط الموقع الجغرافي (DriverLocationBar)
 * الوصف: يعرض آخر إحداثيات أو حالة الاتصال الخاصة بالسائق.
 */

import React from 'react';
import { MOCK_LOCATION } from '../constans'; 
import { MapPin } from "lucide-react";

interface DriverLocationBarProps {
  isTracking: boolean;
}

export function DriverLocationBar({ isTracking }: DriverLocationBarProps) {
return (
  <div className="w-full bg-slate-900/80 border border-slate-700 rounded-3xl px-5 py-4 flex items-center justify-between backdrop-blur-sm">

    <MapPin size={22} className="text-slate-400" />

    <div className="text-right flex-1 mr-4">
      <p className="text-xs text-slate-400">آخر موقع </p>

      <p className="text-white font-semibold">
        {isTracking ? MOCK_LOCATION : "غير متصل"}
      </p>
    </div>

    <span className="text-xs text-slate-500">
      منذ 30 ث
    </span>

  </div>
);
}