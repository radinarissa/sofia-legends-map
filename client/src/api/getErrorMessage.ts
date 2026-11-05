import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      return "Няма връзка със сървъра. Проверете дали е пуснат.";
    }
    const message = (error.response.data as { message?: string } | undefined)?.message;
    return message ?? `Сървърът върна грешка ${error.response.status}.`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Възникна неочаквана грешка.";
}