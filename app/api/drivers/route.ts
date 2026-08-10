/**
 * Drivers API Route
 *
 * Provides the Next.js server-side endpoint for driver collection
 * operations.
 *
 * Responsibilities:
 *
 * - Handles GET requests for retrieving all drivers.
 * - Handles POST requests for creating a new driver.
 * - Reads the authentication token from the server-side cookie.
 * - Forwards authenticated requests to the backend API.
 * - Returns backend responses to the client.
 *
 * Relationship with the application:
 *
 * - Receives requests from driverApi.ts.
 * - Uses serverFetch() to communicate with the Laravel backend.
 * - Acts as the server-side boundary between the client and backend.
 * - Does not contain UI logic.
 */


import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverFetch, ApiError } from "@/lib/server-fetch";

function unauthorized() {
    return NextResponse.json(
        { success: false, message: "غير مصرح" },
        { status: 401 }
    );
}

function handleError(err: unknown) {
    if (err instanceof ApiError) {
        return NextResponse.json(
            { success: false, message: err.message, errors: err.errors },
            { status: err.status }
        );
    }
    return NextResponse.json(
        { success: false, message: "حدث خطأ غير متوقع" },
        { status: 500 }
    );
}

export async function GET() {
    const token = (await cookies()).get("token")?.value;
    if (!token) return unauthorized();

    try {
        const data = await serverFetch("/drivers", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return NextResponse.json({ success: true, data });
    } catch (err) {
        return handleError(err);
    }
}

export async function POST(request: NextRequest) {
    const token = (await cookies()).get("token")?.value;
    if (!token) return unauthorized();

    const json = await request.json().catch(() => null);

    try {
        const data = await serverFetch("/drivers", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify(json),
        });
        return NextResponse.json({ success: true, data });
    } catch (err) {
        return handleError(err);
    }
}