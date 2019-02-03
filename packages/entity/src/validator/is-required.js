export default (value, configs = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!configs.field) throw new Error('validators.isRequired: "field" option is required');
  }

  return configs.field.isBlank(value, configs)
    && 'May not be blank';
};
