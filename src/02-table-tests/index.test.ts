// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
  { a: 123456789, b: 9876543210, action: Action.Add, expected: 9999999999 },
  { a: 9876543210, b: 123456789, action: Action.Add, expected: 9999999999 },
  { a: -10, b: 10, action: Action.Add, expected: 0 },
  {
    a: 9999999999,
    b: 9876543210,
    action: Action.Subtract,
    expected: 123456789,
  },
  {
    a: 9999999999,
    b: 123456789,
    action: Action.Subtract,
    expected: 9876543210,
  },
  { a: 0, b: 10, action: Action.Subtract, expected: -10 },
  { a: 11111, b: 11111, action: Action.Multiply, expected: 123454321 },
  { a: 9999999999, b: 0, action: Action.Multiply, expected: 0 },
  { a: 55, b: -55, action: Action.Multiply, expected: -3025 },
  { a: 55, b: 55, action: Action.Divide, expected: 1 },
  { a: 55, b: 1, action: Action.Divide, expected: 55 },
  { a: 88, b: 22, action: Action.Divide, expected: 4 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: 100, b: 0.5, action: Action.Exponentiate, expected: 10 },
  { a: 2, b: 31, action: Action.Exponentiate, expected: 2147483648 },
  { a: 55, b: 55, action: null, expected: null },
  { a: 88005553535, b: 88007005050, action: [], expected: null },
  { a: 8888, b: 8888, action: 8888, expected: null },
  { a: [55], b: 55, action: Action.Add, expected: null },
  { a: 88005553535, b: null, action: Action.Divide, expected: null },
  { a: 8888, b: ['eight'], action: Action.Multiply, expected: null },
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
