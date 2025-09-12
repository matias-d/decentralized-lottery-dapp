/**
 * Formats a UNIX timestamp (seconds) to a readable date string.
 * Example output: "2025-09-11 15:30"
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
