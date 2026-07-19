import { LoginCredentials, User } from "../types";
import { ApiErrorShape } from "../types";

export class LoginRequestError extends Error {
  errors: Record<string, string[]>;
  status: number;
  constructor(shape: ApiErrorShape) {
    super(shape.message);
    this.errors = shape.errors;
    this.status = shape.status;
  }
}

export const loginApi = async (credentials: LoginCredentials): Promise<{ user: User }> => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "same-origin",
  });

  const body = await res.json();

  if (!res.ok || !body.success) {
    throw new LoginRequestError({
      message: body.message ?? "حدث خطأ",
      errors: body.errors ?? {},
      status: res.status,
    });
  }

  return body.data;
};