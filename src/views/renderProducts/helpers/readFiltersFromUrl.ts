export const readFiltersFromUrl = (): Record<string, string> => {
  const params = new URLSearchParams(location.search);
  const obj: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }

  return obj;
};
