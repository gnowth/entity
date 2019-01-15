export const boxShadow = ({ name } = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!name) throw new Error('style.boxShadow: option "name" is required');
  }

  return props.theme.boxShadows?.[name];
};

export const color = ({ defaultColor = 'black', name, weight = '500' } = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!name) throw new Error('style.color: option "name" is required');
    if (!weight) throw new Error(`style.color (name: ${name}): option "weight" is invalid`);
  }

  return props.theme.colors?.[name] || defaultColor;
};

export const component = ({ name, defaultVariant = 'main', branch } = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!name) throw new Error('style.component: option "name" is required');
  }

  return branch
    ? props.theme.component?.[name]?.[props.variant || defaultVariant]?.[branch]
    : props.theme.component?.[name]?.[props.variant || defaultVariant];
};

export const mixin = ({ name } = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!name) throw new Error('style.mixin: option "name" is required');
  }

  return props.theme.mixins?.[name];
};

export const sizeGridBase = props => props.theme?.vars?.gridBase || '0.5rem';
