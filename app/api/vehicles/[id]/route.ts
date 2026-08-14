import { NextRequest, NextResponse } from "next/server";
import { serverFetch, ApiError } from "@/lib/server-fetch";

/**
 * Vehicles API Route
 *
 * Responsibilities:
 * - Acts as the server-side API boundary for vehicles.
 * - Receives requests from the Next.js client.
 * - Uses serverFetch to communicate with the Laravel backend.
 * - Keeps authentication/token handling on the server.
 *
 * Backend endpoints:
 * GET  /vehicles
 * POST /vehicles
 */

/**
 * GET /api/vehicles
 *
 * Retrieves all vehicles from the Laravel backend.
 */
export async function GET() {
    try {
        const data = await serverFetch("/vehicles", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
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
                message: "Failed to fetch vehicles",
                errors: {},
            },
            {
                status: 500,
            }
        );
    }
}

/**
 * POST /api/vehicles
 *
 * Creates a new vehicle.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const data = await serverFetch("/vehicles", {
            method: "POST",
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
                message: "Failed to create vehicle",
                errors: {},
            },
            {
                status: 500,
            }
        );
    }
}