export function emitUnhandledErrors(
  delay: number,
  enabled = false,
): Promise<[string, string]> {
  if (!enabled) {
    return Promise.resolve(['Hello!', 'EternalRival']);
  }
  setTimeout(() => {
    Promise.reject('Never gonna give you up');
  }, delay);
  setTimeout(() => {
    throw new Error('Never gonna let you down');
  }, delay + 2000);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Never gonna run around and desert you', 'Rick Astley']);
    }, delay + 4000);
  });
}
