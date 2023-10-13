export function saveLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage<T>(key: string): T | undefined {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) as T : undefined;
}
