export function saveLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage<T>(key: string): T | undefined {
  console.log("get localstorage")
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) as T : undefined;
}
export function clearAllLocalStorage() {
  localStorage.clear();
}
export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}