import { VehicleCardSkeleton } from '@/components/ui/Skeletons';

export default function VehiclesLoading() {
  return (
    <div className="p-6 space-y-6 flex-1 bg-[#F8FAFC]">
      {/* هيدر الصفحة النابض */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex justify-between items-center animate-pulse">
        <div className="space-y-2">
          <div className="w-28 h-5 bg-slate-200 rounded-md" />
          <div className="w-20 h-3 bg-slate-100 rounded-md" />
        </div>
        <div className="w-24 h-9 bg-slate-200 rounded-lg" />
      </div>

      {/* شبكة الكروت المؤقتة أثناء الجلب */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((n) => (
          <VehicleCardSkeleton key={n} />
        ))}
      </div>
    </div>
  );
}