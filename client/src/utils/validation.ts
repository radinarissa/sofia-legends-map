const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 2) return "Името трябва да е поне 2 символа";
  if (trimmed.length > 50) return "Името може да е най-много 50 символа";
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Въведете имейл";
  if (!EMAIL_REGEX.test(email.trim())) return "Невалиден имейл адрес";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Въведете парола";
  if (password.length < 8) return "Паролата трябва да е поне 8 символа";
  return null;
}