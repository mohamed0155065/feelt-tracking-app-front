"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { loginSchema } from "../schemas";
import { loginApi, LoginRequestError } from "../api/login";
import { LoginCredentials } from "../types";
import { useInfoUser } from "../store/auth.store";
import { mapUserToUserInfo } from "../lib/mapUserToUserInfo";

export const useLogin = () => {
  const router = useRouter();
  const setUserInfo = useInfoUser((state) => state.setUserInfo);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const {
    mutate,
    isPending: isLoggingIn,
    isError: isLoginError,
  } = useMutation({
    mutationFn: loginApi,

    onSuccess: ({ user }) => {
      setUserInfo(mapUserToUserInfo(user));

      const destination =
        user.role === "driver" ? "/driver" : "/dashboard";

      router.replace(destination);
    },

    onError: (err) => {
      if (err instanceof LoginRequestError) {
        for (const [field, messages] of Object.entries(err.errors)) {
          if (field === "email" || field === "password") {
            setError(field, {
              message: messages[0],
            });
          }
        }
      }
    },
  });

  const onSubmit = (data: LoginCredentials) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoggingIn,
    isLoginError,
  };
};