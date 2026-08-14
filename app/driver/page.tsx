<<<<<<< HEAD:app/driver/page.tsx
import DriverTrackingFeature from '@/features/tracking';

export default function DriverTrackingPage() {
  return <DriverTrackingFeature />;
=======
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
>>>>>>> 2962ebeb6176aac745af6c12d345c9dd5eb700c2:app/tracking/page.tsx
}