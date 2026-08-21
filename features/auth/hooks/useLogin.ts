"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginSchema } from "../schemas";
import { loginApi, LoginRequestError } from "../api/login";
import { LoginCredentials } from "../types";
import { useInfoUser } from "../store/auth.store";

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
      // Store the authenticated user's data so the rest of
      // the app (e.g. the driver tracking page) can read it
      // without an extra "/me" request.
      setUserInfo({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      const destination =
        user.role === "driver" ? "/driver" : "/dashboard";

      router.push(destination);
      router.refresh(); // re-run middleware / server components with new cookie
    },
    onError: (err) => {
      if (err instanceof LoginRequestError) {
        // map field-level validation errors from backend onto the form
        for (const [field, messages] of Object.entries(err.errors)) {
          if (field === "email" || field === "password") {
            setError(field, { message: messages[0] });
          }
        }
      }
    },
  });

  const onSubmit = (data: LoginCredentials) => mutate(data);

  return { register, handleSubmit, onSubmit, errors, isLoggingIn, isLoginError };
};