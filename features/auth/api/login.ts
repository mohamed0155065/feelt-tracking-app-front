import { LoginCredentials } from "../types";

export const loginApi = async ({ email, password }: LoginCredentials) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error("حدث خطأ"));
      resolve("");
    }, 2000);
  });

  return {
    success: true,
    message: "Login successful",
    data: {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxxxxxxxxxxxxxx",
      user: {
        id: "usr_01K8N8P7J3Q5M2R9X1",
        name: "Ahmed Mohamed",
        email,
        phone: "+201012345678",
        role: "admin",
        avatar: "https://ui-avatars.com/api/?name=Ahmed+Mohamed",
        isActive: true,
        createdAt: "2026-07-11T10:30:00Z",
        updatedAt: "2026-07-11T10:30:00Z",
      },
    },
  };
};
