// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  type RawInput = { a: unknown; b: unknown; action: unknown };

  test('should add two numbers', () => {
    const testCases: [RawInput, unknown][] = [
      [{ a: 123456789, b: 9876543210, action: Action.Add }, 9999999999],
      [{ a: 9876543210, b: 123456789, action: Action.Add }, 9999999999],
      [{ a: -10, b: 10, action: Action.Add }, 0],
    ];

    testCases.forEach(([rawInput, expected]) => {
      expect(simpleCalculator(rawInput)).toBe(expected);
    });
  });

  test('should subtract two numbers', () => {
    const testCases: [RawInput, unknown][] = [
      [{ a: 9999999999, b: 9876543210, action: Action.Subtract }, 123456789],
      [{ a: 9999999999, b: 123456789, action: Action.Subtract }, 9876543210],
      [{ a: 0, b: 10, action: Action.Subtract }, -10],
    ];

    testCases.forEach(([rawInput, expected]) => {
      expect(simpleCalculator(rawInput)).toBe(expected);
    });
  });

  test('should multiply two numbers', () => {
    const testCases: [RawInput, unknown][] = [
      [{ a: 11111, b: 11111, action: Action.Multiply }, 123454321],
      [{ a: 9999999999, b: 0, action: Action.Multiply }, 0],
      [{ a: 55, b: -55, action: Action.Multiply }, -3025],
    ];

    testCases.forEach(([rawInput, expected]) => {
      expect(simpleCalculator(rawInput)).toBe(expected);
    });
  });

  test('should divide two numbers', () => {
    const testCases: [RawInput, unknown][] = [
      [{ a: 55, b: 55, action: Action.Divide }, 1],
      [{ a: 55, b: 1, action: Action.Divide }, 55],
      [{ a: 88, b: 22, action: Action.Divide }, 4],
    ];

    testCases.forEach(([rawInput, expected]) => {
      expect(simpleCalculator(rawInput)).toBe(expected);
    });
  });

  test('should exponentiate two numbers', () => {
    const testCases: [RawInput, unknown][] = [
      [{ a: 2, b: 10, action: Action.Exponentiate }, 1024],
      [{ a: 100, b: 0.5, action: Action.Exponentiate }, 10],
      [{ a: 2, b: 31, action: Action.Exponentiate }, 2147483648],
    ];

    testCases.forEach(([rawInput, expected]) => {
      expect(simpleCalculator(rawInput)).toBe(expected);
    });
  });

  test('should return null for invalid action', () => {
    const testCases: [RawInput, unknown][] = [
      [{ a: 55, b: 55, action: null }, null],
      [{ a: 88005553535, b: 88007005050, action: [] }, null],
      [{ a: 8888, b: 8888, action: 8888 }, null],
    ];

    testCases.forEach(([rawInput, expected]) => {
      expect(simpleCalculator(rawInput)).toBe(expected);
    });
  });

  test('should return null for invalid arguments', () => {
    const testCases: [RawInput, unknown][] = [
      [{ a: [55], b: 55, action: Action.Add }, null],
      [{ a: 88005553535, b: null, action: Action.Divide }, null],
      [{ a: 8888, b: ['eight'], action: Action.Multiply }, null],
    ];

    testCases.forEach(([rawInput, expected]) => {
      expect(simpleCalculator(rawInput)).toBe(expected);
    });
  });
});
