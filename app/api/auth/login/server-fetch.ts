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

    console.log("==================================");
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("Calling:", `${API_BASE_URL}${path}`);
    console.log("==================================");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    let res: Response;

    try {
        res = await fetch(`${API_BASE_URL}${path}`, {
            ...init,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "ngrok-skip-browser-warning": "true",
                ...init.headers,
            },
            signal: controller.signal,
            cache: "no-store",
        });
    } catch (err) {
        clearTimeout(timeout);

        console.error("Network Error:", err);

        if (err instanceof Error && err.name === "AbortError") {
            throw new ApiError(408, "انتهت مهلة الاتصال بالخادم");
        }

        throw new ApiError(503, "تعذر الاتصال بالخادم");
    }

    clearTimeout(timeout);

    console.log("Backend Status:", res.status);

    let body: BackendEnvelope<T>;

    try {
        body = await res.json();
        console.log("Backend Response:", body);
    } catch (err) {
        console.error("Invalid JSON:", err);
        throw new ApiError(res.status, "استجابة غير متوقعة من الخادم");
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