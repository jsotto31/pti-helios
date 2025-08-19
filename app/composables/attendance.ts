export function useFormatTimeRange(start: string | null, end: string | null) {
  const placeholder = "--:-- --";

  function formatTime(time: string | null): string {
    if (!time || time.trim() === "") return placeholder;

    const [h, m] = time.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return placeholder;

    const hours = ((h + 11) % 12) + 1; // convert 0–23 → 1–12
    const ampm = h < 12 ? "AM" : "PM";

    return `${hours.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
  }

  const displayStart = formatTime(start);
  const displayEnd   = formatTime(end);

  return `(${displayStart}) - (${displayEnd})`;
}