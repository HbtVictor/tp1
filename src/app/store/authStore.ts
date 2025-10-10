// src/app/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/app/lib/types";
import { useUserStore } from "./userStore";

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setUser: (user: User | null) => void; // ✅ nouvelle méthode
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      login: (email, password) => {
        const { getUserByEmail } = useUserStore.getState();
        const found = getUserByEmail(email);

        if (found && found.password === password) {
          set({ user: found });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null }),

      setUser: (user) => set({ user }), // ✅ permet MAJ du user courant
    }),
    { name: "auth-storage" }
  )
);
