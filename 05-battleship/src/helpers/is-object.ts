export function isObject(rawData: unknown): rawData is Record<string, unknown> {
  return rawData !== null && typeof rawData === 'object';
}
