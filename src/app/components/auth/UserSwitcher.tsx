// src/app/components/auth/UserSwitcher.tsx
'use client';
import { mockUsers } from '../../lib/mockData';
import { useUserStore } from '../../store/userStore';

export function UserSwitcher() {
    const currentUserId = useUserStore(s => s.currentUserId);
    const setUser = useUserStore(s => s.setUser);

    return (
        <select
            value={currentUserId}
            onChange={(e) => setUser(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded"
            title="Utilisateur courant"
        >
            {mockUsers.map(u => (
                <option key={u.id} value={u.id}>{u.username}</option>
            ))}
        </select>
    );
}
