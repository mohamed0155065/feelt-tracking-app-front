/**
 * المشروع: تطبيق تتبع السائقين (FleetTrack PWA)
 * الملف: useDriverTracking.ts
 * الوصف: هوك مخصص لإدارة حالة التتبع والعداد الزمني فقط.
 */

import { useState, useEffect } from 'react';

export function useDriverTracking() {
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

// تأثير العداد الزمني بناءً على حالة الاتصال بالتتبع
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isTracking) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
      setSeconds(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking]);

  const toggleTracking = () => setIsTracking((prev) => !prev);

  return {
    isTracking,
    seconds,
    toggleTracking,
  };
}