
/**
 * Driver API Route
 *
 * Provides the Next.js server-side endpoint for operations
 * on a specific driver.
 *
 * Responsibilities:
 *
 * - Handles GET requests for retrieving a single driver.
 * - Handles PUT requests for updating a driver.
 * - Handles DELETE requests for removing a driver.
 * - Reads the authentication token from the server-side cookie.
 * - Forwards authenticated requests to the backend API.
 *
 * Relationship with the application:
 *
 * - Receives requests from the driver API layer.
 * - Uses the driver ID from the dynamic route parameter.
 * - Uses serverFetch() to communicate with the Laravel backend.
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

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const token = (await cookies()).get("token")?.value;
    if (!token) return unauthorized();

    try {
        const data = await serverFetch(`/drivers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return NextResponse.json({ success: true, data });
    } catch (err) {
        return handleError(err);
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const token = (await cookies()).get("token")?.value;
    if (!token) return unauthorized();

    const json = await request.json().catch(() => null);

    try {
        const data = await serverFetch(`/drivers/${id}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify(json),
        });
        return NextResponse.json({ success: true, data });
    } catch (err) {
        return handleError(err);
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const token = (await cookies()).get("token")?.value;
    if (!token) return unauthorized();

    try {
        const data = await serverFetch(`/drivers/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        return NextResponse.json({ success: true, data });
    } catch (err) {
        return handleError(err);
    }
}