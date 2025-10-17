/**
 * Типизированная обертка для работы с localStorage
 * @typeParam T - тип данных для хранения
 */
export class TypedStorage<T> {
  /**
   * @param key - ключ в localStorage
   * @param defaultValue - значение по умолчанию
   */
  constructor(private readonly key: string, private readonly defaultValue: T) {}

  /**
   * Получает значение из хранилища
   * @returns Значение или defaultValue, если не найдено или повреждено
   */
  get(): T {
    try {
      const item = localStorage.getItem(this.key);

      // Если ничего нет или значение "undefined" — возвращаем дефолт
      if (!item || item === "undefined" || item === "null") {
        return this.defaultValue;
      }

      const parsed = JSON.parse(item);
      // Если парсинг вернул undefined — тоже подстрахуемся
      if (parsed === undefined) {
        return this.defaultValue;
      }

      return parsed as T;
    } catch (error) {
      console.error(`Error reading localStorage key "${this.key}":`, error);
      return this.defaultValue;
    }
  }

  /**
   * Устанавливает значение в хранилище
   * @param value - значение для сохранения
   */
  set(value: T): void {
    try {
      // Не сохраняем undefined — просто удаляем ключ
      if (value === undefined || value === null) {
        localStorage.removeItem(this.key);
        return;
      }

      const serializedValue = JSON.stringify(value);
      localStorage.setItem(this.key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${this.key}":`, error);
    }
  }

  /** Удаляет значение из хранилища */
  remove(): void {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      console.error(`Error removing localStorage key "${this.key}":`, error);
    }
  }

  /** Проверяет наличие значения в хранилище */
  has(): boolean {
    try {
      const item = localStorage.getItem(this.key);
      return item !== null && item !== "undefined" && item !== "null";
    } catch (error) {
      console.error(`Error checking localStorage key "${this.key}":`, error);
      return false;
    }
  }
}
