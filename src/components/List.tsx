import { useUsers } from "../hooks/useUsers";
import type { User } from "../api/users";

/**
 * Пропсы компонента списка пользователей.
 */
interface ListProps {
  /** Вызывается при выборе пользователя в списке. */
  onSelectUser: (user: User) => void;
  /** Идентификатор текущего выбранного пользователя. */
  selectedUserId: number | null;
}

/**
 * Рендерит список пользователей с обработкой загрузки и ошибок.
 *
 * @param props Пропсы компонента.
 * @returns JSX-элемент списка пользователей.
 */
export default function List({ onSelectUser, selectedUserId }: ListProps) {
  const { users, isLoading, error, refetch } = useUsers();
  
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
    return (
      <div className="list">
        <div className="error-box">
          <p>{error}</p>
          <button type="button" onClick={refetch}>Retry</button>
        </div>
      </div>
    );
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
