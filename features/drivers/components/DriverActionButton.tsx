/**
 * المكون: زر التتبع الرئيسي (DriverActionButton)
 * الوصف: زر تفاعلي للبدء والإيقاف مع مؤشرات بصرية وحالة التتبع.
 */

import React from 'react';
import { formatTime } from './utils';
import { Truck } from 'lucide-react';

interface DriverActionButtonProps {
  isTracking: boolean;
  seconds: number;
  toggleTracking: () => void;
}

export function DriverActionButton({ isTracking, seconds, toggleTracking }: DriverActionButtonProps) {
  return (
    <div className="flex flex-col items-center">
      {/* زر التتبع الكبير الرئيسي */}
   <button
  onClick={toggleTracking}
  aria-label={isTracking ? "إيقاف التتبع" : "ابدأ التتبع"}
  className={`relative my-6 w-52 h-52 rounded-full flex flex-col items-center justify-center transition-all duration-300 overflow-hidden ${
    isTracking
      ? "bg-gradient-to-br from-green-500 to-green-700 shadow-[0_0_50px_rgba(34,197,94,0.7)] animate-pulse"
      : "bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105"
  }`}
>
  <div
    className={`absolute inset-0 rounded-full blur-2xl opacity-40 ${
      isTracking ? "bg-green-400" : "bg-blue-400"
    }`}
  />

  <Truck size={56} className="relative z-10 mb-3 text-white" />

  <span className="relative z-10 text-xl font-extrabold tracking-wide">
    {isTracking ? "إيقاف التتبع" : "ابدأ التتبع"}
  </span>
</button>

      {/* النص التوضيحي والعداد الحي */}
      <div className="text-center mb-6">
        <p className="text-xs text-slate-400">
          {isTracking ? "جاري إرسال الموقع..." : "اضغط لبدء إرسال الموقع"}
        </p>
        {isTracking && (
          <span className="block text-3xl font-mono text-green-400 mt-2 font-extrabold tracking-widest">
            {formatTime(seconds)}
          </span>
        )}
      </div>
    </div>
  );
}