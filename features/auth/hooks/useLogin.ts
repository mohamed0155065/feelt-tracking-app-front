"use client";
import useLoginMutation from "./useLoginMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas";
import { useInfoUser } from "@/store/auth.store";
import { LoginCredentials } from "../types";

// خاصه بتسجيل الدخول hook هي 
export const useLogin = () => {
  // zod والتحقق منها عن طريق (inputs)الخاصه بال states
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  // tanStack Query ارسال البيانات للسيرفر عن طريق
  const {
    mutate: login,
    isPending: isLoggingIn,
    isError: isLoginError,
  } = useLoginMutation();

  // zustand الاستور الخاص بالبيانات اللي هتتخزن عندي في
  const { setToken, setUserInfo } = useInfoUser();

  // لما اليوزر يضغط علي زر تسجيل الدخول
  const onSubmit = (dataUser: LoginCredentials) => {
    const { email, password } = dataUser;
    login(
      { email, password },
      {
        onSuccess: (data_user) => {
          // البيانات اللي راجعه من السيرفر بعد تسجيل الدخول
          const {
            data: {
              user: { email, role, name, id },
              accessToken,
            },
            message,
          } = data_user;

          // تحديث الاستور بالبيانات الخاصه بالمستخدم
          setToken(accessToken);
          setUserInfo({
            email: email,
            role: role,
            name: name,
            id: id,
          });

          // توجيه المستخدم حسب الصلاحيه تبعو
          if (role === "admin") location.replace("/dashboard");
          else if (role === "driver") location.replace("/tracking");
        },
        onError: (error) => {
          alert("حدث خطا ما");
          console.error(error)
        },
      },
    );
  };

  return {
    isLoggingIn,
    handleSubmit,
    register,
    onSubmit,
    errors,
    isLoginError,
  };
};
