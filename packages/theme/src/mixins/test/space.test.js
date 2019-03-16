import space from '../space';

describe('mixin space', () => {
  test('mixin is applied for padding, margin and their sub styles', () => {
    const styleObject = space({
      $margin: '16rem',
      $marginBottom: '16rem',
      $marginLeft: '16rem',
      $marginRight: '16rem',
      $marginTop: '16rem',
      $padding: '16rem',
      $paddingBottom: '16rem',
      $paddingLeft: '16rem',
      $paddingRight: '16rem',
      $paddingTop: '16rem',
    });

    expect(styleObject.margin).toBe('16rem');
    expect(styleObject.marginBottom).toBe('16rem');
    expect(styleObject.marginLeft).toBe('16rem');
    expect(styleObject.marginRight).toBe('16rem');
    expect(styleObject.marginTop).toBe('16rem');
    expect(styleObject.padding).toBe('16rem');
    expect(styleObject.paddingBottom).toBe('16rem');
    expect(styleObject.paddingLeft).toBe('16rem');
    expect(styleObject.paddingRight).toBe('16rem');
    expect(styleObject.paddingTop).toBe('16rem');
  });
});
