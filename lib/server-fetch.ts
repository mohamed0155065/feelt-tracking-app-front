import { cookies } from "next/headers";

/**
 * Server API Client
 *
 * Provides a centralized server-side HTTP client for communicating
 * with the Laravel backend.
 *
 * Responsibilities:
 *
 * - Builds backend API requests.
 * - Reads the authentication token from the HttpOnly cookie.
 * - Adds the Authorization header automatically.
 * - Handles backend responses.
 * - Normalizes API errors.
 *
 * Relationship with the application:
 *
 * - Used by Next.js API route handlers.
 * - Communicates directly with the Laravel backend.
 * - Keeps authentication handling centralized.
 * - Runs exclusively on the server.
 */

const API_BASE_URL = process.env.API_BASE_URL;

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public errors: Record<string, string[]> = {}
    ) {
        super(message);
        this.name = "ApiError";
    }
}

type BackendEnvelope<T> = {
    success: boolean;
    message: string;
    data?: T;
    errors?: Record<string, string[]>;
};

export async function serverFetch<T>(
    path: string,
    init: RequestInit = {}
): Promise<T> {
    if (!API_BASE_URL) {
        throw new Error("API_BASE_URL is not configured");
    }

    /**
     * Read the authentication token from the HttpOnly cookie.
     *
     * The login route stores the token using:
     *
     * response.cookies.set("token", ...)
     */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("==================================");
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("Calling:", `${API_BASE_URL}${path}`);
    console.log("Has Token:", Boolean(token));
    console.log("==================================");

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 10000);

    let res: Response;

    try {
        res = await fetch(`${API_BASE_URL}${path}`, {
            ...init,

            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",

                /**
                 * Required when communicating through ngrok.
                 */
                "ngrok-skip-browser-warning": "true",

                /**
                 * Forward the authenticated user's token
                 * to the Laravel backend.
                 */
                ...(token
                    ? {
                        Authorization: `Bearer ${token}`,
                    }
                    : {}),

                /**
                 * Allow individual requests to override
                 * default headers.
                 */
                ...init.headers,
            },

            signal: controller.signal,
            cache: "no-store",
        });
    } catch (err) {
        clearTimeout(timeout);

        console.error("Network Error:", err);

        if (
            err instanceof Error &&
            err.name === "AbortError"
        ) {
            throw new ApiError(
                408,
                "انتهت مهلة الاتصال بالخادم"
            );
        }

        throw new ApiError(
            503,
            "تعذر الاتصال بالخادم"
        );
    }

    clearTimeout(timeout);

    console.log("Backend Status:", res.status);

    let body: BackendEnvelope<T>;

    try {
        body = await res.json();

        console.log(
            "Backend Response:",
            body
        );
    } catch (err) {
        console.error(
            "Invalid JSON:",
            err
        );

        throw new ApiError(
            res.status,
            "استجابة غير متوقعة من الخادم"
        );
    }

    if (!res.ok || !body.success) {
        throw new ApiError(
            res.status,
            body.message ?? "حدث خطأ غير متوقع",
            body.errors ?? {}
        );
    }

    return body.data as T;
}