// src/components/UsersList.tsx
import { User } from "../../lib/types";

interface UsersListProps {
  users: User[];
}

export default function UsersList({ users }: UsersListProps) {
  return (
    <ul role="list" className="divide-y divide-gray-700">
      {users.map((user) => (
        <li key={user.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              alt={user.username}
              src={`https://api.dicebear.com/9.x/identicon/svg?seed=${user.username}`}
              className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold text-white">{user.username}</p>
              <p className="mt-1 truncate text-xs text-gray-400">{user.email}</p>
              <p className="mt-1 text-xs text-gray-500 italic">
                Sujet préféré : {user.sujet}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm text-white">Utilisateur</p>
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/30 p-1">
                <div className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs text-gray-400">Actif</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
