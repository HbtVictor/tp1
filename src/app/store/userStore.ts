// src/app/store/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/app/lib/types";
import { mockUsers } from "@/app/lib/mockData";

interface UserState {
  users: User[];
  addUser: (user: Omit<User, "id" | "role">) => void;
  updateUser: (id: string, updated: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserByEmail: (email: string) => User | undefined;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: mockUsers,

      addUser: (user) =>
        set((state) => ({
          users: [
            ...state.users,
            {
              ...user,
              id: crypto.randomUUID(),
              role: "user", //  ajouté automatiquement ici
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
    }
  )
);
