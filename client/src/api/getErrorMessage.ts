import { isAxiosError } from "axios";

interface ServerError {
  message?: string;
  errors?: string[]; 
}

export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      return "Няма връзка със сървъра. Проверете дали е пуснат.";
    }
    const data = error.response.data as ServerError | undefined;
    if (data?.errors?.length) {
      return data.errors.join(". ");
    }
    return data?.message ?? `Сървърът върна грешка ${error.response.status}.`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Възникна неочаквана грешка.";
}

export function isNotFoundError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 404;
}