import { useCallback, useEffect, useState } from "react";
import { getUsers, type User } from "../api/users";
import { toUserMessage } from "../api/error";

/**
 * Хук для загрузки списка пользователей и управления его состоянием.
 *
 * @returns Объект с данными списка, флагами загрузки/ошибки и функцией повторной загрузки.
 */
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, isLoading, error, refetch: fetchUsers };
}