export default (configs = {}) => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!configs.namespace && !props.namespace) throw new Error('style.component: option "namespace" is required');
  }

  const theme = props.theme?.[`${configs.namespace || props.namespace}_${configs.variant || props.variant || configs.defaultVariant || 'standard'}`];

  return configs.branch ? theme?.[configs.branch] : theme;
};
