"use client";
import React from 'react';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // الخلفية الضبابية المعتمة مع أنيميشن ظهور تدريجي (Fade-in)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 transition-all duration-300 ease-out animate-in fade-in">
      
      {/* جسم النافذة البيضاء مع أنيميشن تكبير مرن (Zoom-in) وصعود خفيف */}
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative border border-slate-100 text-start font-cairo transition-all duration-300 ease-out animate-in zoom-in-95 slide-in-from-bottom-4">
        
        {/* زر الإغلاق العلوي بتأثير دوران ناعم عند الـ Hover */}
        <button 
          onClick={onClose} 
          className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 text-base transition-all duration-200 hover:rotate-90"
        >
          ✕
        </button>

        <h3 className="text-base font-bold text-slate-900">إضافة مركبة جديدة</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">أدخل بيانات المركبة الجديدة للأسطول</p>

        <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* حقول الإدخال مع تأثير إضاءة أزرق عند الـ Focus */}
          <div className="transition-all duration-200">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">رقم اللوحة</label>
            <input 
              type="text" 
              placeholder="أ ب ج 1234" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-mono" 
            />
          </div>

          <div className="transition-all duration-200">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">نوع وموديل المركبة</label>
            <input 
              type="text" 
              placeholder="Toyota Hiace" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all" 
            />
          </div>

          <div className="transition-all duration-200">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">سنة الصنع</label>
            <input 
              type="number" 
              placeholder="2024" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-mono" 
            />
          </div>

          {/* أزرار الحفظ والإلغاء مع تأثير ضغط وتكبير وتغيير لون تفاعلي */}
          <div className="flex gap-3 pt-3">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all duration-150"
            >
              إضافة المركبة
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 font-bold text-xs py-3 rounded-xl active:scale-95 transition-all duration-150"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};