import { useUsers } from "../hooks/useUsers";
import type { User } from "../api/users";

interface ListProps {
  onSelectUser: (user: User) => void;
  selectedUserId: number | null;
}

export default function List({ onSelectUser, selectedUserId }: ListProps) {
  const { users, isLoading, error } = useUsers();
  
  if (isLoading) {
    return (
      <div className="list">
        <ul className="list-items">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i} className="list-item skeleton-item" />
          ))}
        </ul>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="list">
      <ul className="list-items">
        {users.map((user) => (
          <li
            key={user.id}
            className={`list-item ${selectedUserId === user.id ? "list-item-active" : ""}`}
            onClick={() => onSelectUser(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
