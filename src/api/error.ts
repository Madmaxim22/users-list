export class ApiError extends Error {
  public status: number;

  constructor(status: number, message?: string) {
    super(message ?? `HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
  }
}

export function toUserMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 404) return "Данные не найдены.";
    if (error.status >= 500) return "Сервер временно недоступен. Попробуйте позже.";
    return "Ошибка запроса. Попробуйте снова.";
  }

  if (error instanceof TypeError) {
    return "Не удалось подключиться к сети. Проверьте интернет.";
  }

  return "Произошла непредвиденная ошибка.";
}