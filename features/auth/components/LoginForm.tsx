"use client";

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  const {
    handleSubmit,
    isLoggingIn,
    register,
    onSubmit,
    errors,
    isLoginError,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-800 to-blue-900 font-sans p-4">
      {/* Logo */}
      <div className="text-center mb-4 shrink-0">
        <div className="bg-white p-3 rounded-2xl inline-block mb-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="#2563eb"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white m-0">FleetTrack</h1>
        <p className="text-white/70 text-xs mt-1">منصة إدارة الأسطول الذكية</p>
      </div>

      {/* Form fields */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        dir="rtl"
        className="bg-white p-6 rounded-3xl w-full max-w-[380px] shadow-xl text-center overflow-hidden shrink-0"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900">مرحباً بك</h2>

        {isLoginError && (
          <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
            بيانات الدخول غير صحيحة، حاول مرة أخرى
          </div>
        )}

        <div className="text-right mb-3">
          <label className="text-[13px] text-gray-700 mb-1.5 block">
            البريد الإلكتروني
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="admin@gmail.com"
            className={`w-full py-2.5 px-3 border rounded-xl outline-none box-border transition-colors text-sm
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${errors.email ? "border-red-500" : "border-gray-200"}`}
          />
          <div
            className={`mt-1 text-xs h-4 text-red-500 ${errors.email ? "animate-pulse" : ""
              }`}
          >
            {errors.email?.message}
          </div>
        </div>

        <div className="text-right mb-4">
          <label className="text-[13px] text-gray-700 mb-1.5 block">
            كلمة المرور
          </label>
          <div className="relative w-full">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className={`w-full py-2.5 pr-3 pl-10 border rounded-xl outline-none box-border transition-colors text-sm
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${errors.password ? "border-red-500" : "border-gray-200"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          <div
            className={`mt-1 text-xs h-4 text-red-500 ${errors.password ? "animate-pulse" : ""
              }`}
          >
            {errors.password?.message}
          </div>
        </div>

        <button
          disabled={isLoggingIn}
          className="w-full p-3 bg-blue-600 text-white border-none rounded-xl font-semibold text-sm
            h-[48px] flex items-center justify-center transition-colors
            hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoggingIn ? (
            <div className="mx-auto border-2 border-gray-200 border-r-gray-400 animate-spin w-4 h-4 rounded-full"></div>
          ) : (
            "تسجيل الدخول"
          )}
        </button>
      </form>

      {/* Footer message */}
      <p className="text-white/60 text-xs mt-4 shrink-0">تابع أسطولك في الوقت الحالي</p>
    </div>
  );
};