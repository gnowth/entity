import mergeProp from '../merge-prop';

test('mergeProp', () => {
  const merger = mergeProp({ a: 1, b: 2, c: 3});
  const prop = merger({ a: 4, b: 5 }, { a: 6 });

  expect(prop.a).toBe(6);
  expect(prop.b).toBe(5);
  expect(prop.c).toBe(3);
});
