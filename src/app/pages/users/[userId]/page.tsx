"use client";

import { useParams } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";
import { useAuthStore } from "@/app/store/authStore";
import UserCard from "@/app/components/users/UserCard";
import type { User } from "@/app/lib/types";

export default function UserPage() {
  const { userId } = useParams();
  const { users, updateUser } = useUserStore();
  const authUser = useAuthStore((s) => s.user);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return <p className="text-center mt-10 text-gray-600 dark:text-gray-300">Utilisateur introuvable</p>;
  }

  const handleSave = (updatedUser: User) => {
    updateUser(user.id, updatedUser);
    console.log("✅ Utilisateur sauvegardé :", updatedUser);
  };

  return <UserCard/>;
}
