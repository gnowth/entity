import createMixin from '../create-mixin';

describe('createMixin', () => {
  test(
    'prop value as a string',
    () => {
      const mixin = createMixin({
        css: 'margin',
        prop: '$margin',
      });

      expect(mixin({ $margin: '16rem' }).margin).toBe('16rem');
    },
  );

  test(
    'props value as a number with scale as name',
    () => {
      const theme = {
        scale_space: ['0', '1rem', '16rem'],
      };

      const mixin = createMixin({
        css: 'margin',
        prop: '$margin',
        scale: 'space',
      });

      expect(mixin({ theme, $margin: 1 }).margin).toBe('1rem');
      expect(mixin({ theme, $margin: 5 }).margin).toBeUndefined();
      expect(mixin({ theme, $margin: -1 }).margin).toBe('-1rem');
      expect(mixin({ theme, $margin: 1.5 }).margin).toBeUndefined();
    },
  );

  test(
    'props value as a number with scale as function',
    () => {
      const mixin = createMixin({
        css: 'margin',
        prop: '$margin',
        scale: value => `${value}rem`,
      });

      expect(mixin({ $margin: 1 }).margin).toBe('1rem');
      expect(mixin({ $margin: 5 }).margin).toBe('5rem');
      expect(mixin({ $margin: -1 }).margin).toBe('-1rem');
      expect(mixin({ $margin: 1.5 }).margin).toBe('1.5rem');
    },
  );

  test(
    'props value as a number with scale as array',
    () => {
      const mixin = createMixin({
        css: 'margin',
        prop: '$margin',
        scale: ['0', '1rem', '16rem'],
      });

      expect(mixin({ $margin: 1 }).margin).toBe('1rem');
      expect(mixin({ $margin: 5 }).margin).toBeUndefined();
      expect(mixin({ $margin: -1 }).margin).toBe('-1rem');
      expect(mixin({ $margin: 1.5 }).margin).toBeUndefined();
    },
  );
});
