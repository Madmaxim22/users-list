import { useEffect, useState } from "react";
import { getUserById, type UserDetails } from "../api/users";
import { toUserMessage } from "../api/error";

export function useUserDetails(id: number | null) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchUserDetails = async () => {
    if (id === null) {
      setUserDetails(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserById(id);
      setUserDetails(data);
    } catch (err) {
      setError(toUserMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  return { userDetails, isLoading, error, refetch: fetchUserDetails };
}