export const safeParseJson = <T = unknown>(input: unknown): T | null => {
  if (typeof input !== 'string') return null;
  try {
    return JSON.parse(input) as T;
  } catch {
    return null;
  }
};
