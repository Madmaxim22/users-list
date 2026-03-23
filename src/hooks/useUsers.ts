import { useEffect, useState } from "react";
import { getUsers, type User } from "../api/users";
import { toUserMessage } from "../api/error";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(toUserMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error, refetch: fetchUsers };
}