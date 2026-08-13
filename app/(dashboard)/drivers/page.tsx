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
/**
 * Driver Application Entry Point
 *
 * Provides the entry page for authenticated Driver users.
 *
 * Responsibilities:
 *
 * - Renders the Driver application.
 * - Provides the entry point for the Driver-specific experience.
 *
 * Relationship with the application:
 *
 * - Access to this route is protected by middleware.
 * - Only users with the "driver" role should reach this page.
 * - The actual tracking behavior belongs to the Tracking feature,
 *   not to this route.
 *
 * Architecture:
 *
 * Middleware
 *      ↓
 * Driver Authorization
 *      ↓
 * /driver
 *      ↓
 * DriverTrackingFeature
 *
 * Important:
 *
 * - This page does not perform authorization itself.
 * - This page does not communicate directly with Laravel.
 * - Tracking logic will be implemented separately after
 *   authorization is completed.
 */

import DriversFeature from "@/features/drivers";

export default function DriverPage() {
  return (
    <main className="min-h-screen bg-[#0B1120]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-6">
        <DriversFeature />
      </div>
    </main>
  );
}