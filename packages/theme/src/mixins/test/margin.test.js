import margin from '../margin';

describe('mixin margin', () => {
  test('mixin is applied for margin and its sub styles', () => {
    const styleObject = margin({
      $margin: '16rem',
      $marginBottom: '16rem',
      $marginLeft: '16rem',
      $marginRight: '16rem',
      $marginTop: '16rem',
    });

    expect(styleObject.margin).toBe('16rem');
    expect(styleObject.marginBottom).toBe('16rem');
    expect(styleObject.marginLeft).toBe('16rem');
    expect(styleObject.marginRight).toBe('16rem');
    expect(styleObject.marginTop).toBe('16rem');
  });

  test('mixin is applied with space scale', () => {
    const theme = {
      scale_space: ['0', '1rem', '16rem'],
    };

    const styleObject = margin({
      theme,
      $margin: 0,
      $marginBottom: 2,
      $marginLeft: -1,
    });

    expect(styleObject.margin).toBe('0');
    expect(styleObject.marginBottom).toBe('16rem');
    expect(styleObject.marginLeft).toBe('-1rem');
  });
});
