/**
 * Driver
 *
 * Represents the driver assigned to a vehicle.
 *
 * Relationship with the application:
 * - Nested inside the Vehicle interface.
 * - Used by Vehicle List, Vehicle Details,
 *   and any component that displays driver information.
 */
export interface Driver {
    id: number;
    name: string;
    phone: string;
}

/**
 * Vehicle Status
 *
 * Represents all valid vehicle states returned
 * by the backend.
 */
export type VehicleStatus =
    | "active"
    | "idle"
    | "offline";

/**
 * Vehicle Type
 *
 * Represents all supported vehicle categories.
 */
export type VehicleType =
    | "car"
    | "truck"
    | "van"
    | "motorcycle";

/**
 * Vehicle
 *
 * Represents a single vehicle returned from the backend.
 *
 * Responsibilities:
 * - Defines the vehicle data model.
 * - Provides type safety across the Vehicles feature.
 *
 * Relationship with the application:
 * - Used by React Query.
 * - Used by Vehicle List.
 * - Used by Vehicle Details.
 * - Used by Map.
 * - Used by Live Tracking.
 */
export interface Vehicle {
    id: number;

    driver_id: number | null;

    plate_number: string;

    model: string;

    type: VehicleType;

    status: VehicleStatus;

    year: number;

    created_at: string | null;

    driver: Driver | null;
}