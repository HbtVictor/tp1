"use client";

import { useState, useEffect } from "react";
import { Settings, X, Mail, Shield, Tag } from "lucide-react";
import UserEdit from "@/app/components/users/UserEdit";
import type { User } from "@/app/lib/types";

type UserCardProps = {
  user: User;
  onSave: (updatedUser: User) => void;
};

export default function UserCard({ user, onSave }: UserCardProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Au montage, on lit l'ID utilisateur depuis localStorage
  useEffect(() => {
    const getIdFromParsed = (obj: any): string | null => {
      if (!obj) return null;
      // cas simple
      if (typeof obj.id === "string") return obj.id;
      if (obj.user && typeof obj.user.id === "string") return obj.user.id;
      if (obj.state?.user && typeof obj.state.user.id === "string") return obj.state.user.id;
      if (obj.state?.auth?.user && typeof obj.state.auth.user.id === "string") return obj.state.auth.user.id;

      // recherche breadth-first si rien trouvé (parcours limité)
      const queue = [obj];
      const visited = new Set<any>();
      while (queue.length) {
        const cur = queue.shift();
        if (!cur || typeof cur !== "object" || visited.has(cur)) continue;
        visited.add(cur);
        if (typeof cur.id === "string") return cur.id;
        for (const k of Object.keys(cur)) {
          const v = cur[k];
          if (v && typeof v === "object") queue.push(v);
        }
      }
      return null;
    };

    const findUserIdInLocalStorage = (): string | null => {
      // essais de clés connues en priorité
      const candidateKeys = ["authUser", "persist:root", "persistedState", "user", "currentUser"];
      for (const key of candidateKeys) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        try {
          const parsed = JSON.parse(raw);
          const id = getIdFromParsed(parsed);
          if (id) {
            console.debug("[auth] found id in key:", key, id);
            return id;
          }
        } catch (err) {
          // parfois la valeur est double-stringifiée -> essayer parse deux fois
          try {
            const parsed2 = JSON.parse(JSON.parse(raw));
            const id = getIdFromParsed(parsed2);
            if (id) {
              console.debug("[auth] found id (double parsed) in key:", key, id);
              return id;
            }
          } catch {}
        }
      }

      // fallback: scanner tout le localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        try {
          const parsed = JSON.parse(raw);
          const id = getIdFromParsed(parsed);
          if (id) {
            console.debug("[auth] found id scanning all keys:", k, id);
            return id;
          }
        } catch {}
      }

      console.debug("[auth] no user id found in localStorage");
      return null;
    };

    const id = findUserIdInLocalStorage();
    setCurrentUserId(id);
  }, []);

  const isCurrentUser = currentUserId === user.id;

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors">
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-md p-8 transition-all duration-500 hover:shadow-xl animate-fadeInScale"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="relative">
            <img
              src={user.pp}
              alt={user.username}
              className="w-24 h-24 rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-md object-cover"
            />
            {user.role === "admin" && (
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-purple-600 dark:bg-purple-500 rounded-full border-2 border-white dark:border-gray-800">
                <Shield className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Bouton ⚙️ affiché uniquement si l'utilisateur connecté = profil affiché */}
          {isCurrentUser && (
            <button
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setShowEdit(true)}
              aria-label="Modifier le profil"
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>

        {/* Infos */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.username}
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {user.role === "admin" ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold">
                <Shield className="w-3 h-3" />
                Administrateur
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                Utilisateur
              </span>
            )}
          </p>
        </div>

        {/* Détails */}
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <span className="truncate">{user.sujet || "Aucun sujet"}</span>
          </div>
        </div>
      </div>

      {/* Modal d'édition (que si utilisateur courant) */}
      {showEdit && isCurrentUser && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setShowEdit(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md p-6 animate-fadeInScale">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Modifier le profil
                </h3>
                <button
                  onClick={() => setShowEdit(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              <UserEdit
                user={user}
                onClose={() => setShowEdit(false)}
                onSave={onSave}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
