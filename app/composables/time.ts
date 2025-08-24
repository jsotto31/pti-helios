

export function useFormatTo12Hour(time24: string) {
  if (!time24) return "--:-- --";

  const [h, m] = time24.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return "--:-- --";

  const hours = ((h + 11) % 12) + 1; // convert 0–23 → 1–12
  const ampm = h < 12 ? "AM" : "PM";

  return `${hours.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
}


export function useComputeDuration(from: string, to: string): string {
  if (!from || !to) return "00:00"

  const [fromH, fromM] = from.split(":").map(Number)
  const [toH, toM] = to.split(":").map(Number)

  const fromDate = new Date(0, 0, 0, fromH, fromM)
  const toDate = new Date(0, 0, 0, toH, toM)

  let diff = (toDate.getTime() - fromDate.getTime()) / 60000 // minutes

  if (diff < 0) diff += 24 * 60

  const hours = Math.floor(diff / 60)
  const minutes = diff % 60

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`
}