"use client";

import { useState } from "react";
import { Settings, X, Mail, Hash } from "lucide-react";
import UserEdit from "@/app/components/users/UserEdit";
import type { User } from "@/app/lib/types";

type UserCardProps = {
  user: User;
  onSave: (updatedUser: User) => void;
};

export default function UserCard({ user, onSave }: UserCardProps) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="min-h-screen flex items-start justify-center">
      {/* Carte profil simplifiée */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-sm p-8">
        
        {/* En-tête avec photo et bouton */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
            <img
              src={user.pp}
              alt={user.username}
              className="object-cover w-full h-full"
            />
          </div>
          
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setShowEdit(true)}
            aria-label="Paramètres"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Informations */}
        <div className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
            <p className="text-sm text-gray-600 mt-1">Sujet : {user.sujet}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Mail className="w-4 h-4" />
            <span>Mail : {user.email}</span>
          </div>
        </div>
      </div>

      {/* Modal d'édition */}
      {showEdit && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setShowEdit(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Modifier le profil</h3>
                <button
                  onClick={() => setShowEdit(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <UserEdit
                user={user}
                onClose={() => setShowEdit(false)}
                onSave={onSave} // ⬅️ IMPORTANT
                />
            </div>
          </div>
        </>
      )}
    </div>
  );
}