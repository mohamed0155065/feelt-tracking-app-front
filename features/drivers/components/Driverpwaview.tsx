/**
 * المشروع: تطبيق تتبع السائقين (FleetTrack PWA)
 * الملف: Driverpwaview.tsx
 * الوصف: المكون الرئيسي الذي يجمع كافة المكونات المقسمة (الهيدر، الأزرار، الإحصائيات، الموقع).
 */

'use client';

import React from 'react';
import { useDriverTracking } from '../hooks/useDriverTracking';

import { DriverActionButton } from './DriverActionButton';
import { DriverStatsCards } from './DriverStatsCards';
import { DriverLocationBar } from './DriverLocationBar';
import { DriverBottomNav } from "./DriverBottomNav";

export function DriverPwaView() {
  const { isTracking, seconds, toggleTracking } = useDriverTracking();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#020617] text-white p-6">
      <div className="relative w-[390px] max-w-full overflow-hidden rounded-[42px] bg-[#111827] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-slate-700 flex flex-col items-center">

        {/* Glow خلف الزر */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-blue-500/10 blur-3xl"></div>

        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-1.5 rounded-full bg-slate-600"></div>

        <div className="h-6"></div>

        {/* Header */}


        {/* زر التتبع */}
        <DriverActionButton
          isTracking={isTracking}
          seconds={seconds}
          toggleTracking={toggleTracking}
        />

        {/* الإحصائيات */}
        <DriverStatsCards isTracking={isTracking} />

        {/* الموقع */}
        <DriverLocationBar isTracking={isTracking} />

        {/* Bottom Navigation */}
        <DriverBottomNav />

      </div>
    </div>
  );
}