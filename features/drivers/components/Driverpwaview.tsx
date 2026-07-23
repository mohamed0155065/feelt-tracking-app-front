'use client';

import React, { useState, useEffect } from 'react';

export function DriverPwaView() {
  const [isTracking, setIsTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isTracking) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
      <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 flex flex-col items-center">
        
        {/* شريط العنوان */}
        <div className="w-full flex justify-between items-center mb-6">
          <span className="text-sm text-green-400 font-medium">
            {isTracking ? "متصل بالخدمة" : "متوقف"}
          </span>
          <span className="text-sm font-bold text-slate-300">FleetTrack PWA</span>
        </div>

        {/* زرار التتبع الكبير الرئيسي */}
       <button
  onClick={() => setIsTracking(!isTracking)}
  className={`my-6 w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
    isTracking
      ? "bg-green-600 shadow-green-500/50 animate-pulse"
      : "bg-blue-600 shadow-blue-500/50 hover:bg-blue-500"
  }`}
>
        
          <span className="text-4xl mb-2">🚚</span>
          <span className="text-lg font-bold">
            {isTracking ? "إيقاف" : "ابدأ التتبع"}
          </span>
        </button>

        {/* النص التوضيحي والعداد الحي */}
        <div className="text-center mb-6">
          <p className="text-xs text-slate-400">
            {isTracking ? "جاري إرسال الموقع..." : "اضغط لبدء إرسال الموقع"}
          </p>
          {isTracking && (
            <span className="block text-xl font-mono text-green-400 mt-1 font-bold">
              {formatTime(seconds)}
            </span>
          )}
        </div>

        {/* كروت المعلومات */}
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          <div className="bg-slate-950 p-4 rounded-2xl text-center border border-slate-800">
            <span className="block text-2xl font-extrabold text-blue-400">
              {isTracking ? "65" : "0"}
            </span>
            <span className="text-xs text-slate-400">السرعة (km/h)</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl text-center border border-slate-800">
            <span className="block text-2xl font-extrabold text-green-400">
              {isTracking ? "12.4" : "0.0"}
            </span>
            <span className="text-xs text-slate-400">مسافة اليوم (كم)</span>
          </div>
        </div>

        {/* شريط الموقع */}
        <div className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>آخر موقع مُرسل</span>
          <span>{isTracking ? "24.7136°N 46.6753°E" : "غير متصل"}</span>
        </div>

      </div>
    </div>
  );
}