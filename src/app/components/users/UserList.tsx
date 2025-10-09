"use client"; // ⚠️ Doit être la toute première ligne du fichier

import { User } from "../../lib/types";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

interface UsersListProps {
  users: User[];
}

export default function UsersList({ users }: UsersListProps) {
  const router = useRouter();

  const handleUserClick = (userId: string) => {
    router.push(`/UserCard/${userId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        Liste des utilisateurs
      </h2>
      <ul role="list" className="w-full max-w-2xl space-y-6">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center bg-white rounded-2xl shadow-lg px-6 py-5"
          >
            <img
              alt={user.username}
              src={user.pp} // Assure-toi que pp contient le chemin correct
              className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div className="flex-1 ml-6">
              <p className="text-lg font-semibold text-gray-900 text-center">{user.username}</p>
              <p className="mt-1 text-sm text-gray-500 text-center">{user.email}</p>
              <p className="mt-2 text-xs text-gray-400 italic text-center">
                Sujet préféré : {user.sujet}
              </p>
            </div>
            <button
              className="ml-6 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 hover:bg-emerald-200 transition"
              onClick={() => handleUserClick(user.id)}
              aria-label={`Voir la fiche de ${user.username}`}
            >
              <FaArrowRight className="text-emerald-600 text-xl" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
