const TOKEN_KEY = "sofia-legends-token";

export function getToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.warn("Не може да се прочете токенът", error);
    return null;
  }
}

export function saveToken(token: string): void {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.warn("Не може да се запази токенът", error);
  }
}

export function clearToken(): void {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.warn("Не може да се изтрие токенът", error);
  }
}