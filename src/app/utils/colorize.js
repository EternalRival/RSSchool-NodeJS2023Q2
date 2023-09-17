const defaultColor = '[0m';
const colors = new Map([
  ['black', '[30m'],
  ['red', '[31m'],
  ['green', '[32m'],
  ['yellow', '[33m'],
  ['blue', '[34m'],
  ['purple', '[35m'],
  ['cyan', '[36m'],
  ['white', '[37m'],
]);

const applyColor = (colorName, text) => {
  const colorCode = colors.get(colorName) ?? defaultColor;
  return `\x1b${colorCode}${text}\x1b${defaultColor}`;
};

export function colorize(color, text) {
  if (text) return applyColor(color, text);
  return (text) => applyColor(color, text);
}
