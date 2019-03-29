import createMemoEqual from '../create-memo-equal';

describe('createMemoEqual', () => {
  test(
    'two empty object literal',
    () => {
      const memoEqual = createMemoEqual();

      expect(memoEqual({}, {})).toBeTruthy();
    },
  );

  test(
    'two object literal with nested',
    () => {
      const memoEqual = createMemoEqual();

      expect(memoEqual({ a: {} }, { a: {} })).toBeFalsy();
    },
  );

  test(
    'two object literal with nested and nested shallow check',
    () => {
      const memoEqual = createMemoEqual(['a']);

      expect(memoEqual({ a: {} }, { a: {} })).toBeTruthy();
    },
  );

  test(
    'two object literal with double nested and nested shallow check',
    () => {
      const memoEqual = createMemoEqual(['a']);

      expect(memoEqual({ a: {} }, { a: { a: '' } })).toBeFalsy();
    },
  );
});
