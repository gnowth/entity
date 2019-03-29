import shallowEqual from '../shallow-equal';

describe('shallowEqual', () => {
  test(
    'two empty object literal',
    () => expect(shallowEqual({}, {})).toBeTruthy(),
  );

  test(
    'two object literal with nested',
    () => expect(shallowEqual({ a: {} }, { a: {} })).toBeFalsy(),
  );

  test(
    'two object literal with undefined value and nested shallow check',
    () => expect(shallowEqual({ a: undefined }, { b: undefined }, ['a', 'b'])).toBeFalsy(),
  );

  test(
    'two object literal with nested and nested shallow check',
    () => expect(shallowEqual({ a: {} }, { a: {} }, ['a'])).toBeTruthy(),
  );

  test(
    'two object literal with double nested and nested shallow check',
    () => expect(shallowEqual({ a: { a: {} } }, { a: { a: {} } }, ['a'])).toBeFalsy(),
  );
});
