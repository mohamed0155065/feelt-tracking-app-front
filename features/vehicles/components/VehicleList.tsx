"use client";

import { useVehicles } from "../hooks/useVehicles";
import { AssignDriverDialog } from "./AssignDriverDialog";

/**
 * Vehicle List
 *
 * Displays all vehicles available to the authenticated admin.
 *
 * Responsibilities:
 *
 * - Fetches vehicles using useVehicles().
 * - Displays loading state.
 * - Displays error state.
 * - Displays empty state.
 * - Renders vehicle information.
 * - Provides actions for vehicle management.
 *
 * Relationship with the application:
 *
 * - Uses useVehicles() for server state.
 * - Uses AssignDriverDialog for driver assignment.
 * - Does not communicate directly with the backend.
 */

export default function VehicleList() {
    const {
        data: vehicles,
        isLoading,
        isError,
    } = useVehicles();

    if (isLoading) {
        return (
            <div className="p-6">
                Loading vehicles...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-red-500">
                Failed to load vehicles.
            </div>
        );
    }

    if (!vehicles?.length) {
        return (
            <div className="p-6">
                No vehicles found.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {vehicles.map((vehicle) => (
                <div
                    key={vehicle.id}
                    className="rounded-xl border p-4"
                >
                    <h3 className="font-bold">
                        {vehicle.plate_number}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {vehicle.model}
                    </p>

                    <p className="text-sm mt-2">
                        Driver:{" "}
                        {vehicle.driver?.name ?? "Not assigned"}
                    </p>

                    <AssignDriverDialog
                        vehicleId={vehicle.id}
                    />
                </div>
            ))}
        </div>
    );
}