import React from 'react';
import { LiveVehicle } from '../types';

interface PanelProps {
  vehicle: LiveVehicle | null;
  onClose: () => void;
}

export const VehicleSlidePanel: React.FC<PanelProps> = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  return (
    <div className="w-80 bg-zinc-900 border-s border-zinc-800 h-full flex flex-col animate-in slide-in-from-left duration-200">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="font-bold text-xs text-zinc-300">تفاصيل ومسار المركبة</h3> 
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-sm">✕</button>
      </div>
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center">
          <span className="text-3xl">🚚</span>
          <h4 className="font-bold text-base mt-2 text-zinc-200">{vehicle.plateNumber}</h4>
          <p className="text-xs text-zinc-500">{vehicle.model} • {vehicle.year}</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs border-b border-zinc-800/50 pb-2">
            <span className="text-zinc-500">السائق الحالي:</span>
            <span className="font-medium text-zinc-200">{vehicle.driverName}</span>
          </div>
          <div className="flex justify-between text-xs border-b border-zinc-800/50 pb-2">
            <span className="text-zinc-500">السرعة الحالية:</span>
            <span className="font-medium text-blue-400 font-mono">{vehicle.speed} كم/س</span>
          </div>
        </div>
      </div>
    </div>
  );
};