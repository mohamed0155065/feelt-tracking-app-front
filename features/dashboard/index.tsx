"use client";
import React, { useState } from 'react';

export default function DashboardFeature() {
  const [search, setSearch] = useState('');
  
  const initialVehicles = [
    { id: '1', plate: 'أ ب ج 1234', driver: 'محمد أحمد', status: 'online', speed: '65 km/h', type: 'متصل' },
    { id: '2', plate: 'د هـ و 5678', driver: 'عبدالله محمد', status: 'online', speed: '42 km/h', type: 'متصل' },
    { id: '3', plate: 'ز ح ط 9012', driver: 'خالد عبدالرحمن', status: 'idle', speed: 'خامل', type: 'خامل' },
    { id: '4', plate: 'ي ك ل 3456', driver: 'غير معين', status: 'offline', speed: 'غير متصل', type: 'غير متصل' },
  ];

  return (
    <div className="flex-1 flex overflow-hidden animate-in fade-in duration-300">
      {/* الخريطة الداكنة الكحلية كمحاكاة للـ Figma */}
      <div className="flex-1 p-6 flex flex-col gap-4 bg-[#0A0F1D] relative">
        <div className="flex items-center justify-between text-white z-10">
          <div>
            <h1 className="text-base font-bold">الخريطة المباشرة</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">تحديث كل 30 ثانية</p>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg">● متصلة 4</span>
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-lg">● غير متصلة 2</span>
          </div>
        </div>

        {/* نقاط المحاكاة الجغرافية على الخريطة */}
        <div className="flex-1 border border-slate-800/80 rounded-xl relative overflow-hidden bg-[#0F172A]">
          <div className="absolute top-[40%] left-[50%] bg-emerald-500 text-white font-bold text-[10px] p-1.5 rounded-lg shadow-lg flex items-center gap-1 animate-pulse">
            <span>🚚</span> د هـ و 5678
          </div>
          <div className="absolute top-[60%] left-[30%] bg-amber-50 text-amber-700 font-bold text-[10px] p-1.5 rounded-lg shadow-lg flex items-center gap-1">
            <span>🚚</span> ز ح ط 9012
          </div>
        </div>
      </div>

      {/* اللوحة الجانبية البيضاء الصافية لقائمة المركبات الفورية */}
      <div className="w-80 bg-white border-s border-slate-200 flex flex-col h-full shadow-sm">
        <div className="p-4 border-b border-slate-100">
          <input 
            type="text" 
            placeholder="بحث عن مركبة أو سائق..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {initialVehicles.map((v) => (
            <div key={v.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${v.status === 'online' ? 'bg-emerald-50 text-emerald-600' : v.status === 'idle' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
                  🚚
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 font-mono">{v.plate}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{v.driver}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.status === 'online' ? 'bg-emerald-50 text-emerald-600' : v.status === 'idle' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
                {v.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}