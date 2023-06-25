export function parsePathList(str) {
  return str.split(/(?<!\\)\s/).map((v) => v.replace(/\\ /g, ' '));
}
