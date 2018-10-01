import { Map } from 'immutable';

export default (value, options = {}) => {
  const errors = options.field.entity.validate(value, options);

  return !!errors && errors.size > 0 && Map({
    errors,
    message: options.field.errorMessage,
    entityError: true,
  });
};
