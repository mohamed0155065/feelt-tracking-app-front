import * as z from "zod"; 
 
// التحقق من البيانات اللي بيحصل قبل ما اودي البيانات للسيرفر
export const loginSchema = z.object({ 
  email: z.email("الايميل غير مكتوب بطريقه صحيحه"),
  password: z.string().min(8, "كلمه المرور لا تكون اقل من 8 احرف")
});