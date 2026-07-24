"use client";
import { useState } from 'react';
import { DriversTable } from './components/DriversTable';
import { AddDriverModal } from './components/AddDriverModal';
import { useGetAllDrivers } from './hooks/useGetAllDrivers';

export default function DriversFeature() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'online' | 'offline'>('all');

  const { data: drivers, isPending, isError } = useGetAllDrivers();

  return (
    <div className="p-6 space-y-6 flex-1 overflow-y-auto bg-[#F8FAFC] animate-in fade-in duration-300">
      
      {/* الجزء العلوي - الهيدر */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
        <div>
          <h1 className="text-base font-bold text-slate-800">السائقون</h1>
          {/* إظهار عدد السائقين بأمان باستخدام Optional Chaining أو القيمة الافتراضية */}
          <p className="text-[11px] text-slate-400 mt-0.5">
            سائق مسجل {drivers?.length || 0}
          </p>
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

      {/* عرض الـ Spinner أثناء التحميل، أو الخطأ، أو الجدول عند نجاح البيانات */}
      {/* {isPending ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full gap-3 bg-white rounded-xl border border-slate-200/60 p-8 shadow-sm">
          <div className="w-9 h-9 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium text-slate-500">جاري تحميل بيانات السائقين...</p>
        </div>
      ) : isError ? (
        <div className="p-8 text-center text-red-500 text-xs bg-white rounded-xl border border-red-100 shadow-sm">
          حدث خطأ أثناء جلب البيانات، يرجى إعادة المحاولة لاحقاً.
        </div>
      ) : (
        )} */}
        <DriversTable drivers={drivers} filter={filter} />

      {/* المودال */}
      <AddDriverModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}