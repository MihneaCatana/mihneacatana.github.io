/** "2026-07-02" -> "JUL 2026" */
export function fmtMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
    .format(date)
    .toUpperCase();
}

/** "2026-07-02" -> "July 2, 2026" */
export function fmtFullDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/** rough reading time at ~200 wpm */
export function readingTime(text: string): number {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
}
