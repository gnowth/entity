import _ from 'lodash';

export default _.flowRight(
  colors => _.keyBy(colors, color => `palette_${color.name}`),
  colors => colors.map(cols => ({
    ...cols,
    colorMap: _.keyBy(cols.colors, color => color.name),
  })),
);
