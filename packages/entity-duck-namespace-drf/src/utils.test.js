import { getId, NULL_ID } from './utils';

describe('getId', () => {
  test('getId returns a string', () => {
    expect(getId()).toBe('');
  });

  test('return "NULL_ID" for id "null"', () => expect(getId({ id: null })).toBe(NULL_ID));
});
