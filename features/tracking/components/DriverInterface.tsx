"use client";
import React, { useState, useEffect } from 'react';

export const DriverInterface: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [coords, setCoords] = useState({ lat: 24.7136, lng: 46.6753 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setCoords(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.0005,
          lng: prev.lng + (Math.random() - 0.5) * 0.0005,
        }));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  return (
    <div className="w-full max-w-sm bg-[#0B132B] border border-slate-800 rounded-[40px] p-6 shadow-2xl text-center flex flex-col justify-between min-h-[580px] animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
      
      {/* وميض الخريطة الخلفي للتتبع المستمر */}
      {isTracking && (
        <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none" />
      )}

      <div className="flex justify-between items-center text-xs text-slate-400 font-mono relative z-10">
        <span className="font-bold">9:41</span>
        <div className="flex items-center gap-1.5 bg-slate-900/60 px-2 py-1 rounded-full border border-slate-800">
          <span className={`w-2 h-2 rounded-full ${isTracking ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`} />
          <span className="text-[11px] font-medium">{isTracking ? 'متصل وبث حي' : 'غير متصل'}</span>
        </div>
      </div>

      <div className="mt-4 relative z-10">
        <h2 className="text-lg font-bold text-white tracking-wide">محمد أحمد</h2>
        <p className="text-xs text-slate-400 font-mono mt-0.5">أ ب ج 1234</p>
      </div>

      {/* زر التتبع الدائري العملاق ذو الهالة النابضة */}
      <div className="flex flex-col items-center justify-center my-auto relative z-10">
        <div className="relative flex items-center justify-center">
          {isTracking && (
            <>
              <span className="absolute w-44 h-44 rounded-full bg-red-500/20 animate-ping duration-1000" />
              <span className="absolute w-48 h-48 rounded-full bg-red-500/10 animate-pulse" />
            </>
          )}
          <button
            onClick={() => setIsTracking(!isTracking)}
            className={`w-36 h-36 rounded-full font-bold text-sm transition-all duration-300 shadow-2xl flex flex-col items-center justify-center gap-2 active:scale-90 border select-none ${
              isTracking 
                ? 'bg-red-600 border-red-500 text-white shadow-red-600/30' 
                : 'bg-blue-600 border-blue-500 text-white shadow-blue-600/30 hover:bg-blue-700 hover:scale-105'
            }`}
          >
            <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">{isTracking ? '🛑' : '🚚'}</span>
            <span className="tracking-wide text-xs">{isTracking ? 'إنهاء البث' : 'ابدأ التتبع'}</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-6 px-4 leading-relaxed">
          {isTracking ? 'يتم الآن مشاركة إحداثيات موقعك في الخلفية مع لوحة التحكم' : 'اضغط للبدء في تفعيل الخريطة وبث الرحلة فوراُ'}
        </p>
      </div>

      <div className="space-y-2 bg-slate-900/80 p-4 rounded-2xl border border-slate-800/60 text-start relative z-10 shadow-inner">
        <span className="text-[10px] text-slate-500 font-semibold block">الموقع الحالي المستهدف:</span>
        <span className="text-xs font-mono text-blue-400 block tracking-wide">{coords.lat.toFixed(5)}°N, {coords.lng.toFixed(5)}°E</span>
      </div>
    </div>
  );
};