import { useEffect, useState } from "react";
import { getUserById, type UserDetails } from "../api/users";

export function useUserDetails(id: number) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserById(id);
      setUserDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  return { userDetails, isLoading, error, refetch: fetchUserDetails };
}