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

export const formatFileSize = (bytes: number): string => {
  const KB = 1024;
  const MB = KB * 1024;

  if (bytes < KB) {
    return `${bytes} B`;
  }

  if (bytes < MB) {
    const kilobytes = bytes / KB;
    return `${kilobytes.toFixed(1)} KB`;
  }

  const megabytes = bytes / MB;
  return `${megabytes.toFixed(1)} MB`;
};
