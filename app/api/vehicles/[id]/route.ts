import { NextRequest, NextResponse } from "next/server";

import {
    serverFetch,
    ApiError,
} from "@/lib/server-fetch";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

/**
 * Vehicle Item API Route
 *
 * Acts as the server-side API boundary for
 * operations on a single vehicle.
 *
 * Responsibilities:
 * - Receives vehicle-specific requests from the client.
 * - Validates the vehicle route identifier.
 * - Forwards requests to the Laravel backend.
 * - Keeps authentication handling inside serverFetch().
 * - Normalizes backend errors into API responses.
 *
 * Relationship with the application:
 * - Called by vehicle API services.
 * - Uses serverFetch() for Laravel communication.
 * - Reads the authentication token indirectly through serverFetch().
 *
 * Supported operations:
 * - PATCH /api/vehicles/{id}
 * - DELETE /api/vehicles/{id}
 *
 * This route does not:
 * - Manage React Query.
 * - Render UI.
 * - Store authentication tokens in the browser.
 */

function getVehicleId(id: string): number | null {
    const vehicleId = Number(id);

    if (
        !Number.isInteger(vehicleId) ||
        vehicleId <= 0
    ) {
        return null;
    }

    return vehicleId;
}

/**
 * PATCH /api/vehicles/{id}
 *
 * Updates an existing vehicle.
 */
export async function PATCH(
    request: NextRequest,
    context: RouteContext
) {
    const { id } = await context.params;
    const vehicleId = getVehicleId(id);

    if (vehicleId === null) {
        return NextResponse.json(
            {
                success: false,
                message: "معرف المركبة غير صالح.",
                errors: {},
            },
            { status: 400 }
        );
    }

    try {
        const body = await request.json();

        const data = await serverFetch(
            `/vehicles/${vehicleId}`,
            {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof ApiError) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.message,
                    errors: error.errors,
                },
                {
                    status: error.status,
                }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message:
                    "فشل تحديث بيانات المركبة.",
                errors: {},
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/vehicles/{id}
 *
 * Deletes an existing vehicle.
 */
export async function DELETE(
    _request: NextRequest,
    context: RouteContext
) {
    const { id } = await context.params;
    const vehicleId = getVehicleId(id);

    if (vehicleId === null) {
        return NextResponse.json(
            {
                success: false,
                message: "معرف المركبة غير صالح.",
                errors: {},
            },
            { status: 400 }
        );
    }

    try {
        const data = await serverFetch(
            `/vehicles/${vehicleId}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            }
        );

        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof ApiError) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.message,
                    errors: error.errors,
                },
                {
                    status: error.status,
                }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message:
                    "فشل حذف المركبة.",
                errors: {},
            },
            { status: 500 }
        );
    }
}