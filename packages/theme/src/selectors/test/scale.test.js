import scale from '../scale';

describe('selector scale', () => {
  test('select 2nd item in space scale', () => {
    const theme = {
      scale_space: ['0', '1rem', '16rem'],
    };

    expect(scale({ index: 1, name: 'space' })({ theme })).toBe('1rem');
  });
});
