export function toNumber(value: unknown): number | null {
  const parsed: number = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}
