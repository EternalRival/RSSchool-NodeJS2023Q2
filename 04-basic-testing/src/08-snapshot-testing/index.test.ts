// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const values1 = [2, 5, 8];
  const values2 = [4, 6, 6];
  const expected = {
    next: { next: { next: { next: null, value: null }, value: 8 }, value: 5 },
    value: 2,
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(values1);
    expect(list).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(values2);
    expect(list).toMatchSnapshot('list');
  });
});
