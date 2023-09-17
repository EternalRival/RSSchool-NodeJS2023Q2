// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
  { a: 12345678, b: 87654321, action: Action.Add, expected: 99999999 },
  { a: 99999999, b: 87654321, action: Action.Subtract, expected: 12345678 },
  { a: 11111, b: 11111, action: Action.Multiply, expected: 123454321 },
  { a: -123454321, b: -11111, action: Action.Divide, expected: 11111 },
  { a: 2, b: 31, action: Action.Exponentiate, expected: 2147483648 },
  { a: 888, b: 888, action: 888, expected: null },
  { a: 888, b: 'eighteighteight', action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  const colorize = (str: string, colorCode: number): string => {
    return `\x1b[${colorCode}m${str}\x1b[0m`;
  };

  const functionName = colorize('simpleCalculator', 33);
  const propNames = ['a', 'b', 'action']
    .map((prop) => `${colorize(prop, 35)}: ${colorize(`$${prop}`, 36)}`)
    .join(', ');

  const testPrompt = `\x1b[0m${functionName}({ ${propNames} })`;
  const expectedPrompt = `${colorize('//', 2)} ${colorize('$expected', 32)}`;

  test.each(testCases)(`${testPrompt} ${expectedPrompt}`, (testCase) => {
    expect(simpleCalculator(testCase)).toBe(testCase.expected);
  });
});
