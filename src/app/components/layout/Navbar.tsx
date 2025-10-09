"use client";

import Link from "next/link";
import { useAuthStore } from "../../store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/pages/auth");
  };

  // Masquer la navbar sur les pages d'auth
  if (pathname.startsWith("/pages/auth")) return null;

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo / Nom de l'app */}
        <Link href="/pages/articles" className="font-bold text-xl">
          📰 Gestion de Contenu
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/pages/articles" className="hover:text-blue-400 transition">
            Articles
          </Link>
          <Link href="/pages/users" className="hover:text-blue-400 transition">
            Utilisateurs
          </Link>
          {user && (
            <>
              <span className="text-gray-300 text-sm">Connecté : {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>

        {/* Bouton mobile */}
        <button
          className="md:hidden p-2 border rounded border-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-2 space-y-2 bg-gray-800 p-3 rounded">
          <Link href="/pages/articles" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>
            Articles
          </Link>
          <Link href="/pages/users" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>
            Utilisateurs
          </Link>
          {user && (
            <>
              <span className="text-gray-300 text-sm mt-2">Connecté : {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium mt-1"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
