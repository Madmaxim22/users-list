export type User = {
  id: number;
  name: string;
};

const USERS_URL = "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data";


export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${USERS_URL}/users.json`);
  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }
  const data = (await response.json()) as User[];
  return data;
}

export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${USERS_URL}/data/${id}.json`);
  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }
  const data = (await response.json()) as User;
  return data;
}