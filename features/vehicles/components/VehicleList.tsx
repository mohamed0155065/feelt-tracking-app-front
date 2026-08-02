"use client";

import { useVehicles } from "../hooks/useVehicles";
import { useVehicleSelectionStore } from "../store/useVehicleSelectionStore";

/**
 * Vehicle List
 *
 * Displays all vehicles returned from the backend.
 *
 * Responsibilities:
 * - Fetches the vehicles.
 * - Renders the vehicles list.
 * - Allows the user to select a vehicle.
 * - Highlights the selected vehicle.
 *
 * Relationship with the application:
 * - Reads vehicles using useVehicles().
 * - Updates the selected vehicle using
 *   useVehicleSelectionStore().
 * - Map automatically reacts when the selected
 *   vehicle changes.
 */
export function VehicleList() {
    const {
        data: vehicles = [],
        isLoading,
        isError,
        error,
    } = useVehicles();

    const {
        selectedVehicleId,
        selectVehicle,
    } = useVehicleSelectionStore();

    if (isLoading) {
        return <p>Loading vehicles...</p>;
    }

    if (isError) {
        return (
            <p>
                {(error as Error).message}
            </p>
        );
    }

    if (vehicles.length === 0) {
        return <p>No vehicles found.</p>;
    }

    return (
        <div className="space-y-3">
            {vehicles.map((vehicle) => {
                const isSelected =
                    vehicle.id === selectedVehicleId;

                return (
                    <button
                        key={vehicle.id}
                        onClick={() => selectVehicle(vehicle.id)}
                        className={`w-full rounded-lg border p-4 text-left transition
              ${isSelected
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-300"
                            }`}
                    >
                        <h3 className="font-semibold">
                            {vehicle.model}
                        </h3>

                        <p>{vehicle.plate_number}</p>

                        <p>Status : {vehicle.status}</p>

                        <p>Type : {vehicle.type}</p>

                        <p>Year : {vehicle.year}</p>

                        <p>
                            Driver :
                            {vehicle.driver?.name ?? "Unassigned"}
                        </p>
                    </button>
                );
            })}
        </div>
    );
}