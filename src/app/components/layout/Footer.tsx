"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-md border-t border-gray-200 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 text-gray-600 text-sm">
        
        {/* Texte principal */}
        <p className="text-center md:text-left mb-2 md:mb-0">
          © {new Date().getFullYear()} TP1 - Gestion de Contenu. Tous droits réservés.
        </p>

        {/* Liens secondaires */}
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="hover:text-blue-600 transition-colors"
          >
            Mentions légales
          </Link>
          <Link
            href="#"
            className="hover:text-blue-600 transition-colors"
          >
            Confidentialité
          </Link>
          <Link
            href="#"
            className="hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};
