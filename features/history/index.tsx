"use client";
import React from 'react';

export default function HistoryFeature() {
  const points = [
    { time: '08:32', label: 'بدء الرحلة', coords: '24.7136° N, 46.6753° E', status: 'متصل' },
    { time: '08:47', label: 'حي العليا كوبري 4', coords: '24.7245° N, 46.6891° E', status: 'خامل' },
    { time: '09:05', label: 'طريق الملك فهد', coords: '24.7389° N, 46.7012° E', status: 'خامل' },
    { time: '09:22', label: 'مركز المدينة', coords: '24.7512° N, 46.7134° E', status: 'خامل' },
    { time: '09:41', label: 'حي السليمانية', coords: '24.7634° N, 46.7267° E', status: 'خامل' },
    { time: '09:58', label: 'طريق الثمامة', coords: '24.7701° N, 46.7389° E', status: 'خامل' },
    { time: '10:15', label: 'انتهاء الرحلة', coords: '24.7823° N, 46.7512° E', status: 'غير متصل' },
  ];

  return (
    <div className="flex-1 flex overflow-hidden animate-in fade-in duration-300 bg-[#F8FAFC]">
      
      {/* قسم عرض مسار الرحلة الجغرافي الداكن */}
      <div className="flex-1 p-5 flex flex-col gap-4 bg-[#0A0F1D] text-white">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h1 className="text-base font-bold">سجل الرحلات</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">عرض مسار الرحلات السابقة</p>
          </div>
          <div className="flex gap-3 text-xs">
            <select className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300 focus:outline-none">
              <option>اليوم — 2 يوليو 2026</option>
            </select>
            <select className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300 font-mono focus:outline-none">
              <option>أ ب ج 1234</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-medium shadow-md transition-colors">
              عرض المسار
            </button>
          </div>
        </div>

        {/* شريط الإحصاءات السريع للرحلة التاريخية أعلى الخريطة */}
        <div className="grid grid-cols-3 gap-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center text-xs">
          <div>
            <span className="text-slate-500 block mb-0.5">المسافة</span>
            <span className="font-bold text-slate-200">43.2 كم</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">المدة</span>
            <span className="font-bold text-slate-200">1:43 ساعة</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">متوسط السرعة</span>
            <span className="font-bold text-blue-400">61 كم/س</span>
          </div>
        </div>

        {/* الخريطة الداكنة ذات نقاط التحرك */}
        <div className="flex-1 bg-[#0F172A] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-[75%] left-[40%] bg-emerald-500 text-zinc-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg">A</div>
          <div className="absolute top-[25%] left-[75%] bg-red-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg">B</div>
          
          {/* خط التوصيل الوهمي المنقط بين المراحل الجغرافية */}
          <div className="absolute w-[45%] h-[50%] border-t-2 border-l-2 border-dashed border-blue-500/30 rounded-tl-[100px] pointer-events-none" />
        </div>
      </div>

      {/* لوحة خط السير الفرعي بيضاء بالكامل مطابقة تماماً للمظهر الجانبي بالـ Figma */}
      <div className="w-80 bg-white border-s border-slate-200 flex flex-col h-full shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-xs text-slate-700">مراحل الرحلة</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">أ ب ج 1234</p>
        </div>
        <div className="p-4 flex-1 overflow-y-auto space-y-5">
          {points.map((p, idx) => (
            <div key={idx} className="relative flex gap-3 items-start group text-xs animate-in slide-in-from-bottom-2 duration-200">
              {idx !== points.length - 1 && (
                <span className="absolute right-[9px] top-5 w-[2px] h-[calc(100%+20px)] bg-slate-100" />
              )}
              
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] shrink-0 z-10 font-bold ${
                idx === 0 ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 
                idx === points.length - 1 ? 'bg-red-50 border-red-500 text-red-500' : 'bg-blue-50 border-blue-200 text-blue-500'
              }`}>
                {idx === 0 ? 'A' : idx === points.length - 1 ? 'B' : '⏱️'}
              </div>

              <div className="space-y-1 flex-1 pb-1 border-b border-slate-50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{p.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{p.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-slate-400 font-mono">{p.coords}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    p.status === 'متصل' ? 'bg-emerald-50 text-emerald-600' : p.status === 'غير متصل' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {p.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}