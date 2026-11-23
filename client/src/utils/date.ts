const formatter = new Intl.DateTimeFormat("bg-BG", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(iso: string): string {
  return formatter.format(new Date(iso));
}

export function wasEdited(createdAt: string, updatedAt: string): boolean {
  return new Date(updatedAt).getTime() - new Date(createdAt).getTime() > 1000;
}

export function splitDayMonth(isoDate: string): { day: number; month: string } {
  const date = new Date(`${isoDate}T12:00:00`); 
  return {
    day: date.getDate(),
    month: new Intl.DateTimeFormat("bg-BG", { month: "long" }).format(date),
  };
}