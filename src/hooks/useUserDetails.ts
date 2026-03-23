import { useCallback, useEffect, useRef, useState } from "react";
import { getUserById, type UserDetails } from "../api/users";
import { toUserMessage } from "../api/error";

export function useUserDetails(id: number | null) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);


  const fetchUserDetails = useCallback(async () => {
    if (id === null) {
      abortRef.current?.abort(); // Подаёт сигнал отмены: fetch завершается исключением AbortError
      abortRef.current = null; // Сбрасываем ссылку на контроллер, чтобы не было утечки памяти.
      setUserDetails(null); 
      setError(null); 
      setIsLoading(false); 
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller; // Сохраняем ссылку на новый контроллер.

    try {
      setIsLoading(true); 
      setError(null); 
      setUserDetails(null); 
      const data = await getUserById(id, controller.signal); 
      setUserDetails(data); 
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return; // Если запрос был отменён, ничего не делаем. Нормальное поведение.
      }
      setError(toUserMessage(err));
    } finally {
      // Защита от ситуации, когда уже запущен более новый запрос: 
      // старый не должен “зачистить” ссылку на новый контроллер.
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
      // Не трогаем isLoading для отменённого запроса, 
      // чтобы не было миганий состояния от старых операций.
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchUserDetails(); 

    // Это предотвращает обновления состояния после unmount и "висячие" запросы при переходе на другую страницу.
    return () => {
      abortRef.current?.abort(); // Отменяем запрос.
      abortRef.current = null; // Сбрасываем ссылку на контроллер, чтобы не было утечки памяти.
    };
  }, [fetchUserDetails]); // Делаем запрос при изменении id.

  return { userDetails, isLoading, error, refetch: fetchUserDetails }; // Возвращаем детали пользователя, состояние загрузки, ошибку и функцию для повторного запроса.
}