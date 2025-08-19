

export function useFormatTo12Hour(time24: string) {
  if (!time24) return "--:-- --";

  const [h, m] = time24.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return "--:-- --";

  const hours = ((h + 11) % 12) + 1; // convert 0–23 → 1–12
  const ampm = h < 12 ? "AM" : "PM";

  return `${hours.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
}
