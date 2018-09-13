const integer = () => ({ value }) => !Number.isInteger(value)
  && 'errors.validators.integer';

const maxLength = length => ({ value }) => value.length > maxLength
  && [{ id: 'errors.validators.maxLength', values: { max: length } }];

const entityValid = () => ({ field, ...args }) => {
  const errors = field.entity.validate(args);

  return errors.length > 0
    ? [{
      messageID: 'error.validators.entityInvalid',
      errors,
    }]
    : [];
};

// const entityValidSome = () => ({ field, ...options }) => {
//   const fields = field.entity.fields;
//   const hasError = fields::someValues(innerField => innerField.validate().length > 0);
//   return hasError && 'error.validators.entityInvalid';
// };

export default {
  integer,
  maxLength,
  entityValid,
};
