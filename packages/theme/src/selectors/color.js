import idx from 'idx';

export default (configs = {}) => (props) => {
  const { palette } = configs;
  const paletteWeight = configs.paletteWeight || '500';
  const defaultColor = configs.defaultColor || 'black';

  if (process.env.NODE_ENV !== 'production') {
    if (!palette) throw new Error('style.color: option "name" is required');
    if (!paletteWeight) throw new Error(`style.color (name: ${palette}): option "weight" is invalid`);
  }

  if (configs.paletteAsBackground) {
    return (
      idx(props, x => x.theme[`palette_${palette}`].colorMap[paletteWeight].darkContrast)
        ? idx(props, x => x.theme.palette_black.base)
        : idx(props, x => x.theme.palette_white.base)
    ) || defaultColor;
  }

  return idx(props, x => x.theme[`palette_${palette}`].colorMap[paletteWeight].hex)
    || idx(props, x => x.theme[`palette_${palette}`].base)
    || defaultColor;
};
