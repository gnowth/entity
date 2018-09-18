import _isFunction from 'lodash/fp/isFunction';
import { Map } from 'immutable';

export const allowBlank = () => false;

export const isRequired = (value, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!options.field) throw new Error('entity (Validators.isRequired): "field" option is required');
  }

  return options.field.isBlank(value, options)
    && 'May not be blank';
};

export const entityValid = (value, options = {}) => {
  const errors = options.field.entity.validate(value, options);

  return !!errors && errors.size > 0 && Map({
    errors,
    message: options.field.errorMessage,
    entityError: true,
  });
};

export const mayNotBeBlank = (value, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!options.field) throw new Error('"field" option is required when calling "mayNotBeBlank"');
  }

  const validator = options.flag && options.field.flags[options.flag];

  const defaultError = !options.field.blank
    && isRequired(value, options);

  if (!validator) return defaultError;

  const flagError = validator(value, options);

  return defaultError
    ? flagError && defaultError
    : flagError && 'May not be blank';
};

export const isRequiredIf = predicate => (value, options) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(predicate)) throw new Error('Validators (isRequiredIf): predicate argument must be of type function');
  }

  return predicate({ value, ...options }) && isRequired(value, options);
};
