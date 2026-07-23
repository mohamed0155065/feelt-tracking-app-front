"use client";
import React, { useState } from 'react';
import { DriversTable } from './components/DriversTable';
import { AddDriverModal } from './components/AddDriverModal';
import { DriverPwaView } from './components/Driverpwaview';

export default function DriversFeature() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'online' | 'offline'>('all');

  const drivers = [
    { name: 'محمد أحمد', email: 'm.ahmed@fleet.sa', phone: '+966 50 111 2222', vehicle: 'أ ب ج 1234', status: 'متصل' },
    { name: 'عبدالله محمد', email: 'a.mohammed@fleet.sa', phone: '+966 55 333 4444', vehicle: 'د هـ و 5678', status: 'متصل' },
    { name: 'خالد عبدالرحمن', email: 'k.abdulrahman@fleet.sa', phone: '+966 56 555 6666', vehicle: 'ز ح ط 9012', status: 'متصل' },
    { name: 'فهد السلطان', email: 'f.sultan@fleet.sa', phone: '+966 59 777 8888', vehicle: 'م ن س 7890', status: 'متصل' },
    { name: 'سعد الحربي', email: 's.alharbi@fleet.sa', phone: '+966 59 999 0000', vehicle: 'ق ر ش 6789', status: 'متصل' },
    { name: 'ناصر القحطاني', email: 'n.alqahtani@fleet.sa', phone: '+966 55 121 3434', vehicle: 'غير متصل', status: 'غير متصل' },
  ];

  return (
    <div className="p-6 space-y-6 flex-1 overflow-y-auto bg-[#F8FAFC] animate-in fade-in duration-300">
      
      {/* الجزء العلوي - الهيدر */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
        <div>
          <h1 className="text-base font-bold text-slate-800">السائقون</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">سائق مسجل {drivers.length}</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer relative z-10"
        >
          <span>+</span> إضافة سائق جديد
        </button>
      </div>

      {/* الـ Tabs لتصفية البيانات */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-px">
        {(['all', 'online', 'offline'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-all ${
              filter === tab 
                ? 'border-blue-500 text-blue-600 font-bold' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab === 'all' ? 'الكل' : tab === 'online' ? 'متصل' : 'غير متصل'}
          </button>
        ))}
      </div>

  {/* جدول السائقين */}
      <DriversTable drivers={drivers} filter={filter} />

      {/* المودال */}
      <AddDriverModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* واجهة تطبيق السائق PWA اللي عملتيها */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-lg font-bold mb-4 text-slate-700">معاينة واجهة تطبيق السائق (PWA)</h2>
        <DriverPwaView />
      </div>

    </div>
  );
}