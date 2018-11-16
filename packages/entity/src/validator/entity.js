import _isFunction from 'lodash/isFunction';

export default validatorOptions => (value, options) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!options.field) throw new Error('validator.validatorOptions: "field" option is required');
  }

  return _isFunction(validatorOptions)
    ? validatorOptions({
      record: value,
      entity: options.field.getEntity(options),
      ...options,
    })
    : options.field.getEntity(options).validate(value, validatorOptions);
};
