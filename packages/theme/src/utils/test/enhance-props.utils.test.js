import enhancePropsUtils from '../enhance-props.utils';
import mergeProp from '../merge-prop';

describe('enhance props utils', () => {
  test(
    'mergeProps with ',
    () => {
      const themeProps = {
        a: { a: 1, b: 2 },
        b: { a: 1 },
      };

      const componentProps = {
        a: { a: 3, c: 4 },
      };

      const transformMap = {
        a: mergeProp(),
        b: mergeProp(),
      };

      expect(enhancePropsUtils.mergeProps(transformMap, themeProps, componentProps))
        .toEqual({
          a: { a: 3, b: 2, c: 4 },
          b: { a: 1 },
        });
    },
  );
});
