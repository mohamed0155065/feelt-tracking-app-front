import { driverSchemaType } from "@/features/auth/schemas";
import { DriverType } from "../types";

export const getAllDriversApi = async (): Promise<DriverType[]> => {
  const res = await fetch("/api/auth/drivers", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "حدث خطأ أثناء جلب بيانات السائقين");
  }

  return body.data;
};

export const addDriverApi = async (
  driverData: driverSchemaType,
): Promise<DriverType> => {
  const res = await fetch("/api/auth/drivers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(driverData),
    credentials: "include",
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body.message || "حدث خطأ أثناء اضافه بيانات السائقين");
  }
  return body.data;
};
