"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { mockUsers } from "@/app/lib/mockData";
import { User } from "@/app/lib/types";
import UserCard from "@/app/components/users/UserCard";

export default function UserPage() {
  const { userId } = useParams();
  const initialUser = mockUsers.find((u) => u.id === userId);

  const [user, setUser] = useState<User | undefined>(initialUser);

  if (!user) {
    return <p className="text-center mt-10">Utilisateur introuvable</p>;
  }

  const handleSave = (updatedUser: User) => {
    // ⚡ ici tu fais la vraie sauvegarde :
    // - pour l'instant : mise à jour du state local
    // - plus tard : appel à une API (ex: fetch("/api/users", {method:"PUT", body:...}))
    setUser(updatedUser);

    console.log("Utilisateur sauvegardé :", updatedUser);
  };

  return (
    <UserCard user={user} onSave={handleSave} />
  );
}
