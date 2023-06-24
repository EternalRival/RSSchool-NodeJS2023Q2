export function parseArgs(str, prefix = '--') {
  return str.split(/\s+/).filter((substring) => substring.startsWith(prefix));
}
