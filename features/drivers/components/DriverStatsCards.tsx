/**
 * المكون: كروت إحصائيات السائق (DriverStatsCards)
 * الوصف: يعرض السرعة الحالية ومسافة اليوم بشكل منظم في كروت.
 */

import React from 'react';
import { MOCK_SPEED, MOCK_DISTANCE } from '../constans'; 

interface DriverStatsCardsProps {
  isTracking: boolean;
}

export function DriverStatsCards({ isTracking }: DriverStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full mb-6">
      <div className="bg-slate-900/80 p-6 backdrop-blur-sm rounded-3xl text-center border border-slate-700 shadow-lg">
        <span className="block text-5xl font-extrabold text-blue-400">
          {isTracking ? MOCK_SPEED : "0"}
        </span>
        <span className="block text-slate-400 text-sm mt-2">
km/h
</span>
      </div>
      <div className="bg-slate-900/80 p-6 backdrop-blur-sm rounded-3xl text-center border border-slate-700 shadow-lg">
        <span className="block text-5xl font-extrabold text-green-400">
          {isTracking ? MOCK_DISTANCE : "0.0"}
        </span>
        <span className="block text-slate-400 text-sm mt-2">
كم اليوم
</span>
      </div>
    </div>
  );
}