import * as z from "zod"; 
 
// التحقق من البيانات اللي بيحصل قبل ما اودي البيانات للسيرفر
export const loginSchema = z.object({ 
  email: z.email("الايميل غير مكتوب بطريقه صحيحه"),
  password: z.string().min(8, "كلمه المرور لا تكون اقل من 8 احرف")
});

export const driverSchema = z.object({
  name: z
    .string()
    .min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" }),
  email: z
    .string()
    .email({ message: "البريد الإلكتروني غير صحيح" }),
  phone: z
    .string()
    .min(8, { message: "رقم الهاتف غير مكتمل" }),
  vehicle: z
  .string()
    .trim()
    .min(1, { message: "يرجى اختيار مركبة من القائمة" }),
  password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" }),
});
export type driverSchemaType = z.infer<typeof driverSchema>;