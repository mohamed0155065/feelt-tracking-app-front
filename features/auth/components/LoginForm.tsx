"use client";

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

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #1e3a8a 100%)",
        fontFamily: "system-ui, sans-serif",
        margin: 0,
        padding: "20px",
      }}
    >
      {/* اللوجو */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "16px",
            display: "inline-block",
            marginBottom: "12px",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="#2563eb"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "white",
            margin: "0",
          }}
        >
          FleetTrack
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
            marginTop: "4px",
          }}
        >
          منصة إدارة الأسطول الذكية
        </p>
      </div>

      {/* حقل البيانات */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "white",
          padding: "2.5rem",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "24px",
            color: "#111827",
          }}
        >
          مرحباً بك
        </h2>

        <div style={{ textAlign: "right", marginBottom: "16px" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#374151",
              marginBottom: "8px",
              display: "block",
            }}
          >
            البريد الإلكتروني
          </label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              {...register("email")}
              type="email"
              placeholder="admin@gmail.com"
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                outline: "none",
                boxSizing: "border-box",
                borderColor: errors.email ? "red" : "#e5e7eb",
              }}
            />
          </div>
          <div className="mt-1 animate-pulse text-xs h-4 text-red-500">
            {errors.email?.message}
          </div>
        </div>

        <div style={{ textAlign: "right", marginBottom: "24px" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#374151",
              marginBottom: "8px",
              display: "block",
            }}
          >
            كلمة المرور
          </label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              {...register("password")}
              type="password"
              placeholder="********"
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                outline: "none",
                boxSizing: "border-box",
                borderColor: errors.password ? "red" : "#e5e7eb",
              }}
            />
          </div>
          <div className="mt-1 animate-pulse text-xs h-4 text-red-500">
            {errors.password?.message}
          </div>
        </div>

        <button
          disabled={isLoggingIn}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            height: "52px",
          }}
        >
          {isLoggingIn ? (
            <div className="mx-auto border-2 border-gray-200 border-r-gray-400 animate-spin  w-4 h-4 rounded-full "></div>
          ) : (
            " تسجيل الدخول"
          )}
        </button>
      </form>

      {/* رساله */}
      <p
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "14px",
          marginTop: "24px",
        }}
      >
        تابع أسطولك في الوقت الحالي
      </p>
    </div>
  );
};
