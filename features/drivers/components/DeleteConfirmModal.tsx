"use client";
import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { DriverType } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  driver: DriverType | null;
  isPending?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  driver,
  isPending = false,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !driver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200 text-center font-cairo">
        
        {/* أيقونة تحذير لطيفة */}
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100/60">
          <AlertTriangle size={24} />
        </div>

        {/* العناوين */}
        <h3 className="text-base font-bold text-slate-900">تأكيد حذف السائق</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          هل أنت تأكد من رغبتك في حذف السائق{" "}
          <span className="font-bold text-slate-800">"{driver.name}"</span>؟ 
          لا يمكنك التراجع عن هذا الإجراء لاحقاً.
        </p>

        {/* أزرار الإجراءات */}
        <div className="flex gap-3 pt-6">
          <button
            type="button"
            disabled={isPending}
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-red-500/10 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trash2 size={15} />
            {isPending ? "جاري الحذف..." : "تأكيد الحذف"}
          </button>
          
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold text-xs py-3 rounded-xl active:scale-98 transition-all cursor-pointer"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  );
};