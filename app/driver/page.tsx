

import React from 'react';
import { OfflineBanner } from './OfflineBanner';
import { TrackingPermission } from './TrackingPermation';

export default function TrackingPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      {/* Offline banner at the top to notify connection status */}
      <OfflineBanner />

      {/* Permission screen displayed when location access is needed */}
      <TrackingPermission />
    </main>
  );

}