"use client";

import { useState } from "react";
import { useAssignDriver } from "../hooks/useAssginDriver";
import { useGetAllDrivers } from "@/features/drivers/hooks/useGetAllDrivers";

/**
 * Assign Driver Dialog
 *
 * Allows the administrator to assign a driver to a vehicle.
 *
 * Responsibilities:
 *
 * - Displays the available drivers.
 * - Allows the admin to select a driver.
 * - Executes the assign-driver mutation.
 * - Displays loading state.
 * - Displays errors.
 * - Closes the dialog after successful assignment.
 *
 * Relationship with the application:
 *
 * - Receives the vehicle ID from VehicleList.
 * - Uses useDrivers() to display available drivers.
 * - Uses useAssignDriver() to perform the assignment.
 * - Does not communicate directly with the backend.
 */

type Props = {
    vehicleId: number;
};

export function AssignDriverDialog({
    vehicleId,
}: Props) {
    const [driverId, setDriverId] = useState<number | null>(
        null
    );

    const {
        data: drivers,
        isLoading: driversLoading,
    } = useGetAllDrivers();

    const {
        mutate,
        isPending,
        isError,
        isSuccess,
    } = useAssignDriver();

    const handleAssign = () => {
        if (!driverId) return;

        mutate({
            vehicleId,
            driverId,
        });
    };

    return (
        <div className="mt-4 space-y-3">
            <select
                value={driverId ?? ""}
                onChange={(event) =>
                    setDriverId(Number(event.target.value))
                }
                disabled={driversLoading || isPending}
                className="w-full rounded-lg border p-2"
            >
                <option value="">
                    Select driver
                </option>

                {drivers?.map((driver) => (
                    <option
                        key={driver.id}
                        value={driver.id}
                    >
                        {driver.name}
                    </option>
                ))}
            </select>

            <button
                onClick={handleAssign}
                disabled={!driverId || isPending}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
                {isPending ? "Assigning..." : "Assign Driver"}
            </button>

            {isError && (
                <p className="text-sm text-red-500">
                    Failed to assign driver.
                </p>
            )}

            {isSuccess && (
                <p className="text-sm text-green-600">
                    Driver assigned successfully.
                </p>
            )}
        </div>
    );
}