export function formatSalary(salary?: number): string {
  if (!salary) {
    return "Не указано";
  }

  // Форматируем число с разделителями тысяч и добавляем " Р"
  return salary.toLocaleString("ru-RU") + " ₽";
}
