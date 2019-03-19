import isRequired from './is-required';

export default (value, configs = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!configs.field) throw new Error('validator.mayNotBeBlank: "field" option is required');
  }

  const validator = configs.flag && configs.field.flags[configs.flag];

  const defaultError = !configs.field.blank
    && isRequired(value, configs);

  if (!validator) return defaultError;

  const flagError = validator(value, configs);

  return defaultError
    ? flagError && defaultError
    : flagError && 'May not be blank';
};
