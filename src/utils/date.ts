export function combineDateAndTimeToIso(dateStr: string, timeStr: string): string | null {
  // dateStr e.g. "2025-10-15", timeStr "14:00"
  if (!dateStr || !timeStr) return null;
  // create local Date from parts, then toISOString (UTC)
  const [y,m,d] = dateStr.split("-").map(Number);
  const [hh,mm] = timeStr.split(":").map(Number);
  const dt = new Date(y, m-1, d, hh, mm, 0);
  return dt.toISOString(); // API expects date-time string; use ISO
}
