export enum Design {
  default = 0,
  bold = 1,
  faint = 2,
  gray = 90,
  red = 91,
  green = 92,
  yellow = 93,
  blue = 94,
  magenta = 95,
  cyan = 96,
  white = 97,
}

export function colorize(
  str: string,
  ...params: (keyof typeof Design)[]
): string {
  const designParams = params ?? [Design.default];
  const head = `\x1b[${designParams.map((param) => Design[param]).join(';')}m`;
  const tail = `\x1b[${Design.default}m`;
  return `${head}${str}${tail}`;
}
