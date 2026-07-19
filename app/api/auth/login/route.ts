import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { serverFetch, ApiError } from "./server-fetch";
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
        const data = await serverFetch<LoginResponseData>("/api/auth/login", {
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
        console.log("Access Token:", data.token);
        console.log("Length:", data.token?.length);
        return response;
    } catch (err) {
        console.error("========== LOGIN ERROR ==========");
        console.error(err);
        console.error("=================================");

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
                    err instanceof Error ? err.message : "حدث خطأ غير متوقع",
                errors: {},
            },
            {
                status: 500,
            }
        );
    }
}