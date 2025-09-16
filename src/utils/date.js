export function combineDateAndTimeToIso(dateStr, timeStr) {
  // dateStr e.g. "2025-10-15", timeStr "14:00"
  if (!dateStr || !timeStr) return null;
  // create local Date from parts, then toISOString (UTC)
  const [y,m,d] = dateStr.split("-");
  const [hh,mm] = timeStr.split(":");
  const dt = new Date(Number(y), Number(m)-1, Number(d), Number(hh), Number(mm), 0);
  return dt.toISOString(); // API expects date-time string; use ISO
}
