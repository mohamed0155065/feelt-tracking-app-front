"use client";
import React from 'react';
import { useAddDriver } from '../hooks/useAddDriver';

interface AddDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDriverModal: React.FC<AddDriverModalProps> = ({ isOpen, onClose }) => {

  const { register, handleSubmit, onSubmit, errors, isPending,reset } = useAddDriver({
    onSuccessCallback: onClose,
  });
  const handleClose = () => {
    reset(); // مسح البيانات والأخطاء السابقة
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200 text-start font-cairo">
        
        {/* زر الإغلاق العلوي */}
        <button onClick={onClose} className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 text-base transition-colors">
          ✕
        </button>

        <h3 className="text-base font-bold text-slate-900">إضافة سائق جديد</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">أدخل بيانات السائق الجديد</p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">الاسم الكامل</label>
            <input type="text" placeholder="محمد عبدالله" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
             {...register("name")}/>
             {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">البريد الإلكتروني</label>
            <input type="email" placeholder="driver@fleet.sa" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-colors font-mono text-right" dir="ltr" 
            {...register("email")}/>
            {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">رقم الهاتف</label>
            <input type="text" placeholder="+966 50 000 0000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-colors font-mono text-right" dir="ltr" 
            {...register("phone")}/>{errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">كلمة المرور</label>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-colors font-mono" 
            {...register("password")}/>{errors.password && <p className="text-red-500 text-[11px] mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">تعيين مركبة</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-500 focus:outline-none focus:border-blue-500 transition-colors appearance-none bg-no-repeat bg-[left_12px_center]"
            {...register("vehicle")} defaultValue="">
              <option value="" hidden>اختر مركبة...</option>
              <option>أ ب ج 1234</option>
              <option>د هـ و 5678</option>
            </select>
            {errors.vehicle && <p className="text-red-500 text-[11px] mt-1">{errors.vehicle.message}</p>}
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex gap-3 pt-3">
            <button type="submit" disabled={isPending} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-blue-500/10 active:scale-98 transition-all">
               {isPending ? "جاري الإضافة..." : " إضافة السائق"}
            </button>
            <button type="button" onClick={handleClose} className="flex-1 bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 font-bold text-xs py-3 rounded-xl active:scale-98 transition-all">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};