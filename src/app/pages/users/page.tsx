// src/app/users/page.tsx
import { mockUsers } from "../../lib/mockData";
import UsersList from "../../components/users/UserList"; // <-- importe ton composant

export default function UsersPage() {
  return (
    <main className="">
      <UsersList users={mockUsers} />
    </main>
  );
}
