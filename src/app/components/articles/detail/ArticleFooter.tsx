"use client";
import Link from "next/link";
import { useUserStore } from "@/app/store/userStore";

export function ArticleFooter({ authorId }: { authorId?: string }) {
  // Récupération de l'utilisateur par son ID depuis le store
  const user = useUserStore((state) => state.users.find(u => u.id === authorId));

  // Fallback si utilisateur non trouvé
  const displayName = user?.username || "Inconnu";
  const pp = user?.pp; // chemin vers l'image de profil
  const initial = (displayName[0] ?? "I").toUpperCase();

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 px-8 md:px-12 py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          href={`/pages/users/${user?.id ?? ""}`} // <- toujours basé sur le store
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800/50 p-2 rounded-lg"
        >
          {pp && pp !== "empty" ? (
            <img
              src={pp} // chemin relatif depuis public
              alt={`${displayName} profile`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {initial}
            </div>
          )}

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{displayName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Auteur</p>
          </div>
        </Link>

        <Link
          href="/pages/articles"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl"
        >
          Voir tous les articles
        </Link>
      </div>
    </div>
  );
}
