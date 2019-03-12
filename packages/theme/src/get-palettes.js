import _flowRight from 'lodash/flowRight';
import _keyBy from 'lodash/keyBy';

export default _flowRight(
  colors => _keyBy(colors, color => `palette_${color.name}`),
  colors => colors.map(cols => ({
    ...cols,
    colorMap: _keyBy(cols.colors, color => color.name),
  })),
);
