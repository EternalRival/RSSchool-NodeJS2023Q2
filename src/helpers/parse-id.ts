export function parseId(url: string, endpoint: string) {
  return url.slice(endpoint.length + 1).split('/')[0];
}
