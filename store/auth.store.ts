import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthTypes } from "./types.auth.store";

export const useInfoUser = create<AuthTypes>()(
  persist(
    (set) => ({
      // states
      token: undefined,
      userInfo: {
        id: null,
        name: null,
        email: null,
        role: null,
      },

      // actions
      setToken: (token) => set({ token }),
      setUserInfo: (userInfo) => set({ userInfo }),
      logOut: () =>
        set({
          token: undefined,
          userInfo: {
            id: null,
            name: null,
            email: null,
            role: null,
          },
        }),
    }),
    // set data in local storage
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
      }),
    },
  ),
);
