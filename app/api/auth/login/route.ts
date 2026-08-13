/**
 * Login API Route
 *
 * Acts as the server-side authentication boundary between
 * the Next.js application and the Laravel Backend.
 *
 * Responsibilities:
 *
 * - Validates login input using Zod.
 * - Sends valid credentials to the Backend.
 * - Receives the authenticated user, role, and token.
 * - Stores authentication information in HttpOnly cookies.
 * - Returns a safe response to the Client without exposing
 *   the authentication token to browser JavaScript.
 *
 * Relationship with the application:
 *
 * - The Login UI sends credentials to this route.
 * - This route communicates with the Laravel Backend through serverFetch.
 * - The Backend remains the source of truth for authentication
 *   and the user's actual role.
 * - The Middleware later reads the cookies created here to perform
 *   Frontend route protection.
 *
 * Security:
 *
 * - The authentication token is stored in an HttpOnly cookie.
 * - The role cookie is used for Frontend route protection only.
 * - Backend APIs must independently validate the user's permissions.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { serverFetch, ApiError } from "../../../../lib/server-fetch";
import type { LoginResponseData } from "@/features/auth/types";

const bodySchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});

export async function POST(request: NextRequest) {
    const json = await request.json().catch(() => null);

    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
        return NextResponse.json(
            {
                success: false,
                message: "بيانات غير صحيحة",
                errors: parsed.error.flatten().fieldErrors,
            },
            {
                status: 422,
            }
        );
    }

    try {
        const data = await serverFetch<LoginResponseData>("/auth/login", {
            method: "POST",
            body: JSON.stringify(parsed.data),
        });

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            data: {
                user: data.user,
            },
        });

        response.cookies.set("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        response.cookies.set("role", data.user.role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(
                {
                    success: false,
                    message: err.message,
                    errors: err.errors,
                },
                {
                    status: err.status,
                }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message:
                    err instanceof Error
                        ? err.message
                        : "حدث خطأ غير متوقع",
                errors: {},
            },
            {
                status: 500,
            }
        );
    }
}