/**
 * Ошибка HTTP-запроса с сохраненным кодом ответа.
 */
export class ApiError extends Error {
  public status: number;

  /**
   * Создает экземпляр ошибки HTTP-запроса.
   *
   * @param status HTTP-статус ответа.
   * @param message Пользовательский текст ошибки.
   */
  constructor(status: number, message?: string) {
    super(message ?? `HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Преобразует техническую ошибку в понятное сообщение для UI.
 *
 * @param error Исходная ошибка.
 * @returns Текст для отображения пользователю.
 */
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