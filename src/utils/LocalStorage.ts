function getItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
}

function setItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
}

function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

function removeAllItems(pattern: string): void {
  if (typeof window === 'undefined') return;

  Object.keys(localStorage).forEach((key) => {
    if (key.includes(pattern)) {
      localStorage.removeItem(key);
    }
  });
}

function clear(): void {
  if (typeof window === 'undefined') return;
  localStorage.clear();
}

export const LocalStorage = {
  getItem,
  setItem,
  removeItem,
  removeAllItems,
  clear,
};
