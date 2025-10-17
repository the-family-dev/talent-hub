export const formatNumber = (value: number) =>
  `${value.toLocaleString("ru-RU")}`;

export const clearEmptyFields = <T extends Record<string, string | string[]>>(
  fields: T
): Partial<T> => {
  const result: Partial<T> = {};
  for (const key in fields) {
    const value = fields[key];
    if (value !== undefined && value !== null && value.length > 0) {
      result[key] = value;
    }
  }
  return result;
};
