import padding from '../padding';

describe('mixin padding', () => {
  test(
    'mixin is applied for padding and its sub styles',
    () => {
      const styleObject = padding({
        $padding: '16rem',
        $paddingBottom: '16rem',
        $paddingLeft: '16rem',
        $paddingRight: '16rem',
        $paddingTop: '16rem',
      });

      expect(styleObject.padding).toBe('16rem');
      expect(styleObject.paddingBottom).toBe('16rem');
      expect(styleObject.paddingLeft).toBe('16rem');
      expect(styleObject.paddingRight).toBe('16rem');
      expect(styleObject.paddingTop).toBe('16rem');
    },
  );

  test(
    'mixin is applied with space scale',
    () => {
      const theme = {
        scale_space: ['0', '1rem', '16rem'],
      };

      const styleObject = padding({
        theme,
        $padding: 0,
        $paddingBottom: 2,
        $paddingLeft: -1,
      });

      expect(styleObject.padding).toBe('0');
      expect(styleObject.paddingBottom).toBe('16rem');
      expect(styleObject.paddingLeft).toBe('-1rem');
    },
  );
});
