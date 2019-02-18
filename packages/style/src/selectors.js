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
        ? props.theme?.palette_white?.base
        : props.theme?.palette_black?.base
    ) || defaultColor;
  }

  return props.theme?.[`palette_${name}`]?.colorMap[weight]?.hex
    || props.theme?.[`palette_${name}`]?.base
    || defaultColor;
};

export const component = ({ name, defaultVariant = 'main', branch, variant } = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!name) throw new Error('style.component: option "name" is required');
  }

  const theme = props.theme?.[`component_${name}_${variant || props.variant || defaultVariant}`];

  return branch ? theme?.[branch] : theme;
};

export const mixin = ({ name } = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!name) throw new Error('style.mixin: option "name" is required');
  }

  return props.theme?.[`mixin_${name}`];
};

export const sizeGridBase = props => props.theme?.vars?.gridBase || '0.5rem';

export const variant = options => props => Object.keys(props.theme)
  .filter(name => name.startsWith(options.name))
  .map(name => name.replace(options.name, ''));

export const image = props => props.theme?.[`images_${props.name}`];
