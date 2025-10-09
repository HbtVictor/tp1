// src/app/users/page.tsx
import { mockUsers } from "../../lib/mockData";
import UsersList from "../../components/users/UserList"; // <-- importe ton composant

export default function UsersPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>

      {/* Ici on utilise ton composant */}
      <UsersList users={mockUsers} />
    </main>
  );
}
