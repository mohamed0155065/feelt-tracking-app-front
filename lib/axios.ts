// (axios)اعدادات ال
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// هي حاجه وسيطه ل اي بيانات رايحه الي السيرفر
api.interceptors.request.use((config) => {
  // اجيب معلومات تسجيل الدخول من اللوكال ستوريج
  const auth = localStorage.getItem("auth-storage");
  if (auth) {
    try {
      // تحويلها من نص الي اوبجيكت
      let parse = auth ? JSON.parse(auth) : null;
      // استخراج التوكين
      const token = parse?.state?.token;

      // اتحقق ان التوكين موجود
      if (token) {
        // ابعتو مع كل ارسال بيانات هيحصل علي السيرفر
        config.headers.authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Invalid token storage format", error);
    }
  }
  return config;
});

// هي حاجه وسيطه ل اي بيانات راجعه من السيرفر
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
