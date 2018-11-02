import isRequired from './is-required';

export default (value, options = {}) => {
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
