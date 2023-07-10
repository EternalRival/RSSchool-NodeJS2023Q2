export function logRequest(...message: unknown[]): void {
  console.log('<-', ...message);
}

export function logResponse(...message: unknown[]): void {
  console.log('->', ...message);
}
