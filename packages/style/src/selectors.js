export const boxshadow = ({ name } = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!name) throw new Error('style.boxshadow: option "name" is required');
  }

  return props.theme?.[`boxshadows_${name}`];
};

export const color = ({ asBackground, defaultColor = 'black', name, weight = '500' } = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!name) throw new Error('style.color: option "name" is required');
    if (!weight) throw new Error(`style.color (name: ${name}): option "weight" is invalid`);
  }

  if (asBackground) {
    return (
      props.theme?.[`palette_${name}`]?.colorMap[weight]?.darkContrast
        ? props.theme?.palette_black?.base
        : props.theme?.palette_white?.base
    ) || defaultColor;
  }

  return props.theme?.[`palette_${name}`]?.colorMap[weight]?.hex
    || props.theme?.[`palette_${name}`]?.base
    || defaultColor;
};

export const colorFromPalette = (configs = {}) => props => color({
  asBackground: configs.asBackground === undefined
    ? props.paletteAsBackground
    : configs.asBackground,
  name: props.palette || 'black',
  weight: configs.weight || props.paletteWeight,
})(props);

export const component = (configs = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!configs.namespace && !props.namespace) throw new Error('style.component: option "namespace" is required');
  }

  const theme = props.theme?.[`${configs.namespace || props.namespace}_${configs.variant || props.variant || configs.defaultVariant || 'standard'}`];

  return configs.branch ? theme?.[configs.branch] : theme;
};

export const mixin = ({ name } = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!name) throw new Error('style.mixin: option "name" is required');
  }

  return props.theme?.[`mixin_${name}`];
};

export const sizeGridBase = props => props.theme?.var_size_grid || '0.5rem';

export const variant = options => props => Object.keys(props.theme)
  .filter(name => name.startsWith(options.name))
  .map(name => name.replace(options.name, ''));

export const image = props => props.theme?.[`images_${props.name}`];

export const variable = configs => props => props.theme?.[`var_${configs.name || props.name}_${configs.variant || props.variant}`];
