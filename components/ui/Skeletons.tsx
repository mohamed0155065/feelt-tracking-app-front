import React from 'react';

/**
 * عدد الأسطر الافتراضي لهيكل جدول السائقين
 */
const DEFAULT_SKELETON_ROWS = 5;

/**
 * هيكل عظمي نابض لكروت عرض المركبات
 * يُستخدم أثناء تحضير بيانات السيارات/المركبات في الواجهة
 */
export const VehicleCardSkeleton: React.FC = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm animate-pulse space-y-4">
    {/* الهيدر العلوي للكارت: اسم المركبة + شارة الحالة */}
    <div className="flex justify-between items-center">
      <div className="w-16 h-4 bg-slate-200 rounded-md" />
      <div className="w-12 h-4 bg-slate-200 rounded-full" />
    </div>

    {/* مساحة الصورة أو الأيقونة المركزية للمركبة */}
    <div className="w-full bg-slate-100 rounded-xl h-28 flex flex-col items-center justify-center gap-2">
      <div className="w-10 h-10 bg-slate-200 rounded-full" />
      <div className="w-24 h-4 bg-slate-200 rounded-md" />
    </div>

    {/* تفاصيل إضافية: رقم اللوحة أو السائق */}
    <div className="w-full h-8 bg-slate-100 rounded-lg" />

    {/* أزرار الإجراءات السفلية: التفاصيل وتحديد الموقع */}
    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
      <div className="h-8 bg-slate-200 rounded-lg" />
      <div className="h-8 bg-slate-200 rounded-lg" />
    </div>
  </div>
);

/**
 * هيكل عظمي نابض لجدول عرض بيانات السائقين
 * يُستخدم كحالة تحميل مؤقتة لشاشات الجداول والقوائم
 */
export const DriverTableSkeleton: React.FC = () => (
  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
    {/* شريط رأس الجدول (Table Header) */}
    <div className="bg-slate-100 h-10 w-full" />

    {/* أسطر الجدول النابضة (Table Rows) */}
    <div className="divide-y divide-slate-100">
      {Array.from({ length: DEFAULT_SKELETON_ROWS }).map((_, index) => (
        <div key={index} className="p-4 flex items-center justify-between gap-4">
          {/* عمود اسم السائق والصورة الشخصية */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="w-24 h-4 bg-slate-200 rounded-md" />
          </div>

          {/* عمود البريد الإلكتروني (يظهر في الشاشات المتوسطة فما فوق) */}
          <div className="w-32 h-4 bg-slate-100 rounded-md hidden md:block" />

          {/* عمود رقم الهاتف (يظهر في الشاشات الصغيرة فما فوق) */}
          <div className="w-24 h-4 bg-slate-100 rounded-md hidden sm:block" />

          {/* عمود حالة المتصل / غير متصل */}
          <div className="w-16 h-5 bg-slate-200 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export default DriverTableSkeleton;