// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 0.2, b: 0.3, action: Action.Add, expected: 0.5 },
  { a: NaN, b: 2, action: Action.Add, expected: NaN },
  { a: Infinity, b: 2, action: Action.Add, expected: Infinity },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 3, b: NaN, action: Action.Subtract, expected: NaN },
  { a: 3, b: Infinity, action: Action.Subtract, expected: -Infinity },
  { a: Infinity, b: 3, action: Action.Subtract, expected: Infinity },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 0, action: Action.Multiply, expected: 0 },
  { a: 3, b: -2, action: Action.Multiply, expected: -6 },
  { a: 3, b: Infinity, action: Action.Multiply, expected: Infinity },
  { a: 3, b: -Infinity, action: Action.Multiply, expected: -Infinity },
  { a: 3, b: Infinity, action: Action.Divide, expected: 0 },
  { a: -Infinity, b: 1, action: Action.Divide, expected: -Infinity },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 6, b: -2, action: Action.Divide, expected: -3 },
  { a: 5, b: 2, action: Action.Divide, expected: 2.5 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: -2, action: Action.Exponentiate, expected: 0.25 },
  { a: 3, b: Infinity, action: Action.Exponentiate, expected: Infinity },
  { a: 3, b: -Infinity, action: Action.Exponentiate, expected: 0 },
  { a: 3, b: -Infinity, action: Action.Exponentiate, expected: 0 },
  { a: 3, b: -Infinity, action: 'Invalid', expected: null },
  { a: 3, b: -Infinity, action: undefined, expected: null },
  { a: 3, b: -Infinity, action: null, expected: null },
  { a: 3, b: -Infinity, action: {}, expected: null },
  { a: 3, b: -Infinity, expected: null },
  { a: 3, b: '', action: Action.Exponentiate, expected: null },
  { a: 3, b: {}, action: Action.Exponentiate, expected: null },
  { a: 3, b: undefined, action: Action.Exponentiate, expected: null },
  { a: undefined, b: undefined, action: undefined, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b equal $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
