import _ from 'lodash';

export default validatorOptions => (value, options) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!options.field) throw new Error('validator.validatorOptions: "field" option is required');
  }

  return _.isFunction(validatorOptions)
    ? validatorOptions({
      record: value,
      entity: options.field.entity,
      ...options,
    })
    : options.field.entity.validate(value, validatorOptions);
};
