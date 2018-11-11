export default (value, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!options.field) throw new Error('entity (Validators.isRequired): "field" option is required');
  }

  return options.field.isBlank(value, options)
    && 'May not be blank';
};
