import { NextRequest, NextResponse } from "next/server";
import { serverFetch, ApiError } from "@/lib/server-fetch";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

/**
 * Assign Driver API Route
 *
 * Responsibilities:
 * - Assigns a driver to a specific vehicle.
 *
 * Backend endpoint:
 * PATCH /vehicles/{id}/assign
 */
export async function PATCH(
    request: NextRequest,
    context: RouteContext
) {
    const { id } = await context.params;

    try {
        const body = await request.json();

        const data = await serverFetch(`/vehicles/${id}/assign`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

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
                message: "Failed to assign driver",
                errors: {},
            },
            {
                status: 500,
            }
        );
    }
}