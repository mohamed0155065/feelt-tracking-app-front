'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check initial connection status
    setIsOffline(!navigator.onLine);

    // Event listeners for online/offline status changes
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  // Smooth slide-down animation when offline, hidden when online
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-rose-600 text-white px-4 py-2 text-center text-sm font-medium shadow-md transition-all duration-300 ease-in-out ${
        isOffline ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        <WifiOff size={16} />
        <span>⚠️ أنت غير متصل، البيانات هتحتفظ وترسل لما ترجع متصل</span>
      </div>
    </div>
  );
}