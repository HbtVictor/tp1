// src/app/store/userStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/app/lib/types";
import { mockUsers } from "@/app/lib/mockData";

interface UserState {
  users: User[];
  currentUserId: string;
  setCurrentUser: (id: string) => void;
  addUser: (user: Omit<User, "id" | "role">) => void;
  updateUser: (id: string, updated: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserByEmail: (email: string) => User | undefined;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: mockUsers,
      currentUserId: mockUsers[0].id,
      setCurrentUser: (id) => set({ currentUserId: id }),

      addUser: (user) =>
        set((state) => ({
          users: [
            ...state.users,
            {
              ...user,
              id: crypto.randomUUID(),
              role: "user",
              pp: "empty",
              sujet: user.sujet ?? "empty",
            },
          ],
        })),

      updateUser: (id, updated) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, ...updated } : u
          ),
        })),

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),

      getUserByEmail: (email) => get().users.find((u) => u.email === email),
    }),
    {
      name: "user-storage",
      // ✅ Empêche Zustand d’utiliser localStorage côté serveur
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // Return a no-op storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
