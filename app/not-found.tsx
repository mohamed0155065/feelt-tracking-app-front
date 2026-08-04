import Link from 'next/link';
import { Radar, Navigation } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-[#0B132B] text-white flex flex-col items-center justify-center p-4 text-center relative overflow-hidden"
      dir="rtl"
    >
      {/* خلفية بوميض رادار */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="relative z-10 max-w-md bg-[#0F172A] border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
        {/* أيقونة الرادار الداكنة */}
        <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Radar className="w-10 h-10 animate-spin-slow" />
        </div>

        <div>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            خطأ 404
          </span>
          <h1 className="text-2xl font-bold mt-3 text-slate-100">
            فقدنا إشارة هذه الصفحة!
          </h1>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            الصفحة التي تحاول الوصول إليها خرجت عن مسار الأسطول المعتمد أو تم
            نقلها لموقع آخر.
          </p>
        </div>

        {/* زر العودة للوحة التحكّم / الخرائط */}
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
        >
          <Navigation className="w-4 h-4 rtl:rotate-180" />
          <span>العودة للخرائط المباشرة</span>
        </Link>
      </div>
    </div>
  );
}