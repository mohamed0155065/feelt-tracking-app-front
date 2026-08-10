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

export default function DriversPage() {
  return <DriversFeature />;
}