"use client";
import React from 'react';
import { LiveVehicle } from '../types';

interface LiveMapProps {
  vehicles: LiveVehicle[];
  onSelectVehicle: (vehicle: LiveVehicle) => void;
}

export const LiveMap: React.FC<LiveMapProps> = ({ vehicles, onSelectVehicle }) => {
  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden flex items-center justify-center border border-zinc-800 rounded-xl min-h-[450px]">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="absolute inset-0 border-t border-b border-zinc-800/50 my-auto h-1/2 flex items-center justify-between px-20">
        <div className="w-[1px] h-full bg-zinc-800/50" />
        <div className="w-[1px] h-full bg-zinc-800/50" />
      </div>

      {vehicles.map((v) => (
        <button
          key={v.id}
          onClick={() => onSelectVehicle(v)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 group focus:outline-none"
          style={{ top: `${v.lat}%`, left: `${v.lng}%` }}
        >
          <div className="relative flex items-center justify-center">
            <span className={`animate-ping absolute inline-flex h-6 w-6 rounded-full opacity-60 ${v.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span className={`relative inline-flex rounded-full h-3 w-3 ${v.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </div>
          <div className="absolute bottom-5 right-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap pointer-events-none shadow-xl transition-opacity duration-150 z-30">
            <p className="font-bold">{v.plateNumber}</p>
            <p className="text-[10px] text-zinc-400">{v.driverName} • {v.speed} كم/س</p>
          </div>
        </button>
      ))}
    </div>
  );
};