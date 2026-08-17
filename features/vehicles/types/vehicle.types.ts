/**
 * Vehicle Types
 *
 * Defines the TypeScript contracts used throughout
 * the Vehicles feature.
 *
 * Responsibilities:
 * - Defines the vehicle entity.
 * - Defines vehicle categories.
 * - Defines create payloads.
 * - Defines partial update payloads.
 * - Defines driver-assignment payloads.
 *
 * Relationship with the application:
 * - Used by API services.
 * - Used by React Query hooks.
 * - Used by vehicle components.
 * - Used by the vehicle selection store.
 *
 * This file contains type definitions only.
 * It does not communicate with APIs or manage state.
 */

export type VehicleType =
    | "truck"
    | "van"
    | "car"
    | "bus";

export type VehicleDriver = {
    id: number;
    name: string;
};

export type Vehicle = {
    id: number;
    plate_number?: string;
    model?: string;
    type?: VehicleType;
    year?: number | null;
    driver_id: number | null;
    driver?: VehicleDriver | null;
};

export type CreateVehiclePayload = {
    plate_number: string;
    model: string;
    type: VehicleType;
    year?: number;
};

export type UpdateVehiclePayload = {
    id: number;
    plate_number?: string;
    model?: string;
    type?: VehicleType;
    year?: number;
};

export type AssignDriverPayload = {
    vehicleId: number;
    driverId: number;
};