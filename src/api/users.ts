import { ApiError } from "./error";

export type User = {
  id: number;
  name: string;
};

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


export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${USERS_URL}/users.json`);
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  const data = (await response.json()) as User[];
  return data;
}

export async function getUserById(id: number, signal?: AbortSignal): Promise<UserDetails> {
  const response = await fetch(`${USERS_URL}/${id}.json`, { signal });
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  const data = (await response.json()) as UserDetails;
  return data;
}