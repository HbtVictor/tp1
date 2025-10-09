"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // ✅ icônes propres et légères

export const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Empêche le "Hydration mismatch"
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleLogout = () => {
    logout();
    router.push("/pages/auth/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Titre */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-semibold text-blue-700 whitespace-nowrap"
        >
          TP1 - Gestion de Contenu
        </Link>

        {/* Bouton burger (mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Menu"
        >
          {isOpen ? <X size={22} color="black"/> : <Menu size={22} color="black"/>}
        </button>

        {/* Liens Desktop */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {!user && (
            <>
              <Link href="/pages/auth/login" className="hover:text-blue-600">
                Connexion
              </Link>
              <Link href="/pages/auth/register" className="hover:text-blue-600">
                Inscription
              </Link>
            </>
          )}

          {user && (
            <>
              <Link href="/pages/articles" className="hover:text-blue-600">
                Articles
              </Link>

              {user.role === "admin" && (
                <Link href="/pages/users" className="hover:text-blue-600">
                  Utilisateurs
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
          <div className="flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
            {!user && (
              <>
                <Link
                  href="/pages/auth/login"
                  className="hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  href="/pages/auth/register"
                  className="hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}

            {user && (
              <>
                <Link
                  href="/pages/articles"
                  className="hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Articles
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/pages/users"
                    className="hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Utilisateurs
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
