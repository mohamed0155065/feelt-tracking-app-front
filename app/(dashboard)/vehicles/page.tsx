import { VehicleList } from "@/features/vehicles/components/VehicleList";

/**
 * Vehicles Page
 *
 * Displays the vehicles feature.
 *
 * Relationship with the application:
 * - Renders the VehicleList component.
 */
export default function VehiclesPage() {
  return (
    <main className="p-6">
      <VehicleList />
    </main>
  );
}