import { ApiError } from "./error";

/**
 * Краткая информация о пользователе для списка.
 */
export type User = {
  id: number;
  name: string;
};

/**
 * Полная информация о пользователе для карточки деталей.
 */
export interface UserDetails {
  id: number;
  name: string;
  avatar: string;
  details: {
    city: string;
    company: string;
    position: string;
  };
}

const USERS_URL = "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data";


/**
 * Загружает список пользователей.
 *
 * @returns Массив пользователей для отображения в списке.
 * @throws {ApiError} Если сервер вернул неуспешный HTTP-статус.
 */
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${USERS_URL}/users.json`);
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  const data = (await response.json()) as User[];
  return data;
}

/**
 * Загружает подробности пользователя по его идентификатору.
 *
 * @param id Идентификатор пользователя.
 * @param signal Сигнал для отмены запроса.
 * @returns Полная информация о пользователе.
 * @throws {ApiError} Если сервер вернул неуспешный HTTP-статус.
 */
export async function getUserById(id: number, signal?: AbortSignal): Promise<UserDetails> {
  const response = await fetch(`${USERS_URL}/${id}.json`, { signal });
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  const data = (await response.json()) as UserDetails;
  return data;
}