/**
 * Driver API
 *
 * Provides client-side functions for communicating with
 * the application's driver API endpoints.
 *
 * Responsibilities:
 *
 * - Sends HTTP requests related to drivers.
 * - Provides functions for creating and fetching drivers.
 * - Handles API responses and request errors.
 *
 * Relationship with the application:
 *
 * - Called by driver-related React Query hooks.
 * - Communicates with the Next.js API routes.
 * - Does not contain UI or React Query logic.
 * - Does not communicate directly with Laravel.
 */

export interface DriverPayload {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    vehicleId?: string;
    is_active?: boolean;
}

/**
 * Fetches all drivers.
 */
export async function getAllDrivers() {
    const response = await fetch("/api/drivers", {
        method: "GET",
        credentials: "include",
    });

    const result = await response.json();

    console.log("🔥 DRIVERS API RESPONSE:", result);

    if (!response.ok || !result.success) {
        throw new Error(
            result?.message || "Failed to fetch drivers"
        );
    }

    return result;
}
/**
 * Creates a new driver.
 */
export async function addDriver(
    data: DriverPayload
) {
    const response = await fetch("/api/drivers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result?.message || "Failed to add driver"
        );
    }

    return result;


}
export async function updateDriver(
    id: number,
    data: DriverPayload
) {
    const response = await fetch(`/api/drivers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(
            result?.message || "Failed to update driver"
        );
    }

    return result;
}

export async function deleteDriver(id: number) {
    const response = await fetch(`/api/drivers/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(
            result?.message || "Failed to delete driver"
        );
    }

    return result;
}
