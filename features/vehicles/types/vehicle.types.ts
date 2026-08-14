/**
 * Vehicle Types
 *
 * Defines the TypeScript models used throughout
 * the Vehicles feature.
 *
 * Responsibilities:
 *
 * - Defines the structure of a vehicle.
 * - Defines the data required to create a vehicle.
 * - Defines the data required to update a vehicle.
 * - Defines the relationship between a vehicle and its driver.
 *
 * Relationship with the application:
 *
 * - Used by API services for type safety.
 * - Used by React Query hooks.
 * - Used by Vehicle UI components.
 *
 * This file contains types only.
 * It does not communicate with the backend.
 */

export type VehicleType =
    | "truck"
    | "van"
    | "car"
    | "bus";

export type Vehicle = {
    id: number;
    plate_number?: string;
    model?: string;
    type?: VehicleType;
    year?: number;
    driver_id: number | null;

    driver?: {
        id: number;
        name: string;
    } | null;
};

export type CreateVehiclePayload = {
    plate_number: string;
    model: string;
    type: VehicleType;
    year?: number;
};

export type UpdateVehiclePayload = {
    id: number;
    plate_number: string;
    model: string;
    type: VehicleType;
    year?: number;
};

export type AssignDriverPayload = {
    vehicleId: number;
    driverId: number;
};