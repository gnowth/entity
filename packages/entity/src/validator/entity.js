import _isFunction from 'lodash/isFunction';

export default validatorOptions => (value, options) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!options.field) throw new Error('entity-validator (entity): "field" option is required');
    // TODO check that field is entityField
  }

  // TODO this is just a draft. need proper implementation and think about nested. nested option should be passed down. and if nested is false, it should not trigger nested entity validator
  return _isFunction(validatorOptions)
    ? validatorOptions({
      record: value,
      entity: options.field.getEntity(options),
      ...options,
    })
    : options.field.getEntity(options).validate(value, validatorOptions);
};

// const validators = [];
// const record = '';
// const entity = '';
// entity.validate(record, {
//   fields: {
//     field1: [
//       validators.isRequired,
//       validators.entity({ nested: false }),
//       validators.entity(({ entity, record }) => entity.validate(record)),
//     ],
//   },
// });
