'use client';

import React, { useEffect, useRef } from 'react';
import { useHistoryStore } from '../store/useHistoryStore';
import { TripTimelineProps } from '../types';

export const TripTimeline: React.FC<TripTimelineProps> = ({ points }) => {
  const selectedStopId = useHistoryStore((state) => state.selectedStopId);
  const setSelectedStopId = useHistoryStore((state) => state.setSelectedStopId);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto Scroll when selected from Map
  useEffect(() => {
    if (selectedStopId && itemRefs.current[selectedStopId]) {
      itemRefs.current[selectedStopId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedStopId]);

  return (
    <div className="w-80 bg-white border-s border-slate-200 flex flex-col h-full shadow-sm">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-xs text-slate-700">مراحل وخط سير الرحلة</h3>
        <p className="text-[10px] text-slate-400 mt-0.5">أ ب ج 1234</p>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-5">
        {points.map((p, idx) => {
          const id = `stop-${idx}`;
          const isSelected = selectedStopId === id;

          return (
            <div
              key={idx}
              ref={(el) => { itemRefs.current[id] = el; }}
              onClick={() => setSelectedStopId(id)}
              className={`relative flex gap-3 items-start group text-xs cursor-pointer p-2 rounded-lg transition-all ${
                isSelected ? 'bg-blue-50/80 ring-1 ring-blue-400' : 'hover:bg-slate-50'
              }`}
            >
              {idx !== points.length - 1 && (
                <span className="absolute right-[17px] top-6 w-[2px] h-[calc(100%+12px)] bg-slate-100" />
              )}

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] shrink-0 z-10 font-bold ${
                  idx === 0
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                    : idx === points.length - 1
                    ? 'bg-red-50 border-red-500 text-red-500'
                    : 'bg-blue-50 border-blue-200 text-blue-500'
                }`}
              >
                {idx === 0 ? 'A' : idx === points.length - 1 ? 'B' : '⏱️'}
              </div>

              <div className="space-y-1 flex-1 pb-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{p.locationName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{p.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-slate-400 font-mono">{p.coords}</p>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                      p.status === 'متصل'
                        ? 'bg-emerald-50 text-emerald-600'
                        : p.status === 'غير متصل'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};