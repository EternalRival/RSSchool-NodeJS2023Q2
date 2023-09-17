enum Color {
  RED = '31',
  GREEN = '32',
  YELLOW = '33',
  CYAN = '36',
}

function colorize(color: Color): (text: string) => string {
  return (text: string) => `\x1b[${color}m${text}\x1b[0m`;
}

export const red = colorize(Color.RED);
export const green = colorize(Color.GREEN);
export const yellow = colorize(Color.YELLOW);
export const cyan = colorize(Color.CYAN);
