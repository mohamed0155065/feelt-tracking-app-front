"use client";

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HistoryMap } from './components/HistoryMap';
import { TripTimeline } from './components/TripTimeline';
import { RoutePoint } from './types';

// 1. الداتا الـ Constant للـ Fallback لو حصل مشكلة في الـ Backend
const FALLBACK_POINTS = [
  { time: '08:32', label: 'بدء الرحلة', coords: '24.7136° N, 46.6753° E', status: 'متصل', lat: 24.7136, lng: 46.6753 },
  { time: '08:47', label: 'حي العليا كوبري 4', coords: '24.7245° N, 46.6891° E', status: 'خامل', lat: 24.7245, lng: 46.6891 },
  { time: '09:05', label: 'طريق الملك فهد', coords: '24.7389° N, 46.7012° E', status: 'خامل', lat: 24.7389, lng: 46.7012 },
  { time: '09:22', label: 'مركز المدينة', coords: '24.7512° N, 46.7134° E', status: 'خامل', lat: 24.7512, lng: 46.7134 },
  { time: '09:41', label: 'حي السليمانية', coords: '24.7634° N, 46.7267° E', status: 'خامل', lat: 24.7634, lng: 46.7267 },
  { time: '09:58', label: 'طريق الثمامة', coords: '24.7701° N, 46.7389° E', status: 'خامل', lat: 24.7701, lng: 46.7389 },
  { time: '10:15', label: 'انتهاء الرحلة', coords: '24.7823° N, 46.7512° E', status: 'غير متصل', lat: 24.7823, lng: 46.7512 },
];

export default function HistoryFeature() {
  // 2. محاولة جلب الداتا من الباك إند
  const { data: apiData, isError } = useQuery({
    queryKey: ['history-points'],
    queryFn: async () => {
      const res = await fetch('/api/history');
      if (!res.ok) throw new Error('Failed to fetch tracking history');
      return res.json();
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  // 3. Fallback Mechanism: لو فيه إيرور أو الداتا مش موجودة نرجع للـ Constants
  const activePoints = useMemo(() => {
    if (isError || !apiData || !Array.isArray(apiData) || apiData.length === 0) {
      return FALLBACK_POINTS;
    }
    return apiData;
  }, [apiData, isError]);

  // تجهيز الداتا للـ Timeline
  const timelinePoints: RoutePoint[] = useMemo(() => {
    return activePoints.map((p) => ({
      time: p.time,
      status: p.status,
      locationName: p.label,
      coords: p.coords,
    }));
  }, [activePoints]);

  return (
    <div className="flex-1 flex overflow-hidden animate-in fade-in duration-300 bg-[#F8FAFC]">
      {/* قسم الخريطة والـ Header */}
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

        {/* شريط الإحصاءات */}
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

        {/* الخريطة الداكنة Mapbox */}
        <div className="flex-1 border border-slate-800 rounded-xl relative overflow-hidden">
          <HistoryMap points={activePoints} />
        </div>
      </div>

      {/* الـ Timeline الفرعي */}
      <TripTimeline points={timelinePoints} />
    </div>
  );
}