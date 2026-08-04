import React from 'react';

export interface RoutePoint {
  time: string;
  status: string;
  locationName: string;
  coords: string;
}

export const TripTimeline: React.FC<{ points: RoutePoint[] }> = ({ points }) => {
  return (
    <div className="w-80 bg-zinc-900 border-s border-zinc-800 h-full flex flex-col">
      <div className="p-4 border-b border-zinc-800">
        <h3 className="font-bold text-xs text-zinc-400">مراحل وخط سير الرحلة</h3>
      </div>
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {points.map((p, idx) => (
          <div key={idx} className="relative flex gap-4 items-start group">
            {idx !== points.length - 1 && (
              <span className="absolute right-[11px] top-6 w-[2px] h-[calc(100%+24px)] bg-zinc-800" />
            )}
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] shrink-0 z-10 font-bold ${
              idx === 0 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 
              idx === points.length - 1 ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-zinc-800 border-zinc-700 text-zinc-400'
            }`}>
              {idx === 0 ? 'A' : idx === points.length - 1 ? 'B' : '•'}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-200">{p.locationName}</span>
                <span className="text-[10px] text-zinc-500 font-mono">{p.time}</span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono">{p.coords}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};