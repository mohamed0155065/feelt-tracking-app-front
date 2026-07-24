import { driverSchemaType, updateDriverSchemaType } from "@/features/auth/schemas";
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

export const getDriverByIdApi =async (id:string):Promise<DriverType>=>{

  const res=await fetch(`/api/auth/drivers/${id}`,{
    method:"GET",
    headers:{"Content-Type":"application/json"},
    credentials:"include"
  })

  const body=await res.json()

  if (!res.ok) {
    throw new Error(body.message || "حدث خطأ أثناء جلب بيانات السائق");
  }

  return body.data;

} 
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

export const updateDriverApi = async (id:string,
  driverData: updateDriverSchemaType,
): Promise<DriverType> => {
  const res = await fetch(`/api/auth/drivers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(driverData),
    credentials: "include",
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body.message || "حدث خطأ أثناء تعديل بيانات السائق");
  }
  return body.data;
};

export const deleteDriverApi = async (id: string): Promise<DriverType> => {
  const res = await fetch(`/api/auth/drivers/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.message || "حدث خطأ أثناء حذف بيانات السائق");
  }

  return body?.data;
};
