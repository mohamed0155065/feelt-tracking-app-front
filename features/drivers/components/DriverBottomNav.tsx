import React from "react";
import { Home, History } from "lucide-react";

export function DriverBottomNav() {
  return (
    <div className="w-full mt-8 border-t border-slate-700 pt-5 flex justify-around items-center">
      
      <button className="flex flex-col items-center text-blue-400">
        <Home size={22} />
        <span className="text-xs mt-1">الرئيسية</span>
      </button>

      <button className="flex flex-col items-center text-slate-400 hover:text-white transition">
        <History size={22} />
        <span className="text-xs mt-1">السجل</span>
      </button>

    </div>
  );
}