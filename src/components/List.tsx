import { useUsers } from "../hooks/useUsers";


export default function List() {
  const { users, isLoading, error } = useUsers();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="list">
      <h2 className="list-title">Users List</h2>
      <ul className="list-items">
        {users.map((user) => (
          <li key={user.id} className="list-item">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
