// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = { a: 12345678, b: 87654321, action: Action.Add };
    const expected = 99999999;

    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should subtract two numbers', () => {
    const rawInput = { a: 99999999, b: 87654321, action: Action.Subtract };
    const expected = 12345678;

    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should multiply two numbers', () => {
    const rawInput = { a: 11111, b: 11111, action: Action.Multiply };
    const expected = 123454321;

    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should divide two numbers', () => {
    const rawInput = { a: -123454321, b: -11111, action: Action.Divide };
    const expected = 11111;

    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = { a: 2, b: 31, action: Action.Exponentiate };
    const expected = 2147483648;

    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should return null for invalid action', () => {
    const rawInput = { a: 888, b: 888, action: 888 };

    expect(simpleCalculator(rawInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rawInput = { a: 888, b: 'eighteighteight', action: Action.Multiply };

    expect(simpleCalculator(rawInput)).toBeNull();
  });
});
