/**
 * Drivers Page
 *
 * Entry point for the drivers management page.
 *
 * Responsibilities:
 *
 * - Renders the DriversFeature.
 * - Does not contain business logic.
 * - Does not fetch drivers directly.
 */

import DriversFeature from "@/features/drivers";

export default function DriverPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <DriversFeature />
      </div>
    </div>
  );
}