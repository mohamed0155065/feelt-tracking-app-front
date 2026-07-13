"use client";
import React, { useState, useEffect } from 'react';

export default function DriverTrackingFeature() {
  const [isTracking, setIsTracking] = useState(false);
  const [coords, setCoords] = useState({ lat: 24.7136, lng: 46.6753 });
  const [timer, setTimer] = useState(0);

  // محاكاة حركية لبث الموقع والعداد الزمني عند تفعيل التتبع
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        setCoords((prev) => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.0006,
          lng: prev.lng + (Math.random() - 0.5) * 0.0006,
        }));
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-cairo">
      {/* العنوان العلوي للمحاكاة */}
      <div className="text-center mb-5">
        <h1 className="text-base font-bold text-slate-800">تطبيق السائق</h1>
        <p className="text-[11px] text-slate-400 mt-0.5">محاكاة تجربة السائق على الجوال</p>
      </div>

      {/* شاسيه هاتف PWA الداكن بالكامل كحلي ليلي */}
      <div className="w-full max-w-sm bg-[#0C1426] border border-slate-800 rounded-[40px] p-6 shadow-2xl text-center flex flex-col justify-between min-h-[580px] animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
        
        {/* وميض خلفي خفيف نابض باللون الأزرق أثناء البث النشط */}
        {isTracking && (
          <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none" />
        )}

        {/* شريط البيانات العلوي للهاتف */}
        <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono relative z-10">
          <span className="font-bold">9:41</span>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
            <span className={`w-1.5 h-1.5 rounded-full ${isTracking ? 'bg-emerald-500 animate-ping' : 'bg-slate-500'}`} />
            <span className="text-[10px] font-medium text-slate-300">{isTracking ? 'نشط الآن' : 'غير متصل'}</span>
          </div>
        </div>

        {/* بيانات السائق ورقم المركبة */}
        <div className="mt-4 relative z-10">
          <h2 className="text-base font-bold text-white tracking-wide">محمد أحمد</h2>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">أ ب ج 1234</p>
        </div>

        {/* زر الـ CTA الدائري الضخم بهالاته النبضية */}
        <div className="flex flex-col items-center justify-center my-auto relative z-10">
          <div className="relative flex items-center justify-center">
            {isTracking && (
              <>
                <span className="absolute w-40 h-40 rounded-full bg-blue-500/20 animate-ping duration-1000" />
                <span className="absolute w-44 h-44 rounded-full bg-blue-500/10 animate-pulse" />
              </>
            )}
            <button
              onClick={() => setIsTracking(!isTracking)}
              className={`w-32 h-32 rounded-full font-bold text-xs transition-all duration-300 shadow-2xl flex flex-col items-center justify-center gap-2 border select-none active:scale-90 ${
                isTracking 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-blue-600/30' 
                  : 'bg-blue-600 border-blue-500 text-white shadow-blue-600/30 hover:bg-blue-700 hover:scale-105'
              }`}
            >
              <span className="text-xl">🚚</span>
              <span className="tracking-wide">{isTracking ? 'ابدأ التتبع' : 'ابدأ التتبع'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-6 px-4 leading-relaxed">
            اضغط لبدء إرسال الموقع
          </p>
        </div>

        {/* كروت البيانات السفلية المتطابقة بالملي مع صورة الجوال */}
        <div className="space-y-3 mt-auto relative z-10">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#090E1A] p-3 rounded-2xl border border-slate-800/60 shadow-inner">
              <span className="text-[10px] text-slate-500 block mb-0.5">0</span>
              <span className="text-[10px] text-slate-400 block font-mono">km/h</span>
            </div>
            <div className="bg-[#090E1A] p-3 rounded-2xl border border-slate-800/60 shadow-inner">
              <span className="text-[10px] text-slate-500 block mb-0.5">0.0</span>
              <span className="text-[10px] text-slate-400 block">كم اليوم</span>
            </div>
          </div>

          {/* لوحة إحداثيات الموقع اللحظي الأخير */}
          <div className="bg-[#090E1A] p-3 rounded-2xl border border-slate-800/60 text-start flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">📍</span>
              <div>
                <span className="text-[9px] text-slate-500 block">آخر موقع مرسل</span>
                <span className="text-[10px] font-mono text-blue-400 block mt-0.5">
                  {coords.lat.toFixed(4)}°N {coords.lng.toFixed(4)}°E
                </span>
              </div>
            </div>
            <span className="text-[9px] text-slate-500 font-mono">منذ 30 ث</span>
          </div>

          {/* شريط التنقل السفلي للهاتف المحاكي للمظهر */}
          <div className="grid grid-cols-2 gap-1 pt-2 border-t border-slate-800/60 text-[10px]">
            <button className="flex flex-col items-center gap-0.5 text-blue-500 font-bold">
              <span>📊</span>
              <span>الرئيسية</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-400">
              <span>⏱️</span>
              <span>السجل</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}