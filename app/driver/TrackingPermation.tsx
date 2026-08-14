import React from 'react';
import { MapPin } from 'lucide-react';

export function TrackingPermission() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-slate-950 text-white">
      {/* Large location icon in the center */}
      <div className="p-6 mb-6 rounded-full bg-slate-900 border border-slate-800 text-rose-500 shadow-lg">
        <MapPin size={48} />
      </div>

      {/* Permission header text */}
      <h2 className="text-xl font-bold mb-3">تحتاج إذن لموقعك لتتبع رحلتك</h2>
      <p className="text-sm text-slate-400 max-w-xs mb-8">
        نحتاج إلى الوصول لموقعك الجغرافي لتحديث خط السير وإرسال البيانات للمدير لحظة بلحظة.
      </p>

      {/* Allow location permission button */}
      <button 
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => console.log(position),
              (error) => console.log(error)
            );
          }
        }}
        className="w-full max-w-xs py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md transition-all active:scale-95 mb-4"
      >
        السماح بالوصول للموقع
      </button>

      {/* Instructions if permission is denied */}
      <div className="text-xs text-slate-500 max-w-xs space-y-1">
        <p>إذا تم رفض الإذن، يرجى تفعيله يدوياً:</p>
        <p>• في أندرويد/آيفون: افتح إعدادات المتصفح وقُم بالسماح للموقع.</p>
      </div>
    </div>
  );
}