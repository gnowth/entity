import color from './color';

export default (configs = {}) => props => color({
  paletteAsBackground: configs.paletteAsBackground === undefined
    ? props.$paletteAsBackground
    : configs.paletteAsBackground,
  defaultColor: configs.defaultColor,
  palette: configs.palette || props.$palette || 'black',
  paletteWeight: configs.paletteWeight || props.$paletteWeight,
})(props);
