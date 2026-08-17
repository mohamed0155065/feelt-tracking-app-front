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
 * Assign Driver API Route
 *
 * Handles driver assignment for a specific vehicle.
 *
 * Responsibilities:
 * - Receives the vehicle ID from the route.
 * - Receives the driver ID from the request body.
 * - Forwards the assignment request to Laravel.
 * - Normalizes backend errors.
 *
 * Relationship with the application:
 * - Called by assignDriver().
 * - Uses serverFetch() for authenticated backend communication.
 * - Keeps authentication tokens outside the client.
 *
 * Backend endpoint:
 * PATCH /vehicles/{id}/assign
 *
 * This route does not:
 * - Manage React Query.
 * - Render UI.
 * - Manage dialog state.
 */

export async function PATCH(
    request: NextRequest,
    context: RouteContext
) {
    const { id } = await context.params;
    const vehicleId = Number(id);

    if (
        !Number.isInteger(vehicleId) ||
        vehicleId <= 0
    ) {
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
            `/vehicles/${vehicleId}/assign`,
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
                    "فشل تعيين السائق.",
                errors: {},
            },
            { status: 500 }
        );
    }
}