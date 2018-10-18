import { List, Map } from 'immutable';

export default validators => (values, options) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!List.isList(values)) throw new Error('entity-validator (list): "values" must be a list');
  }

  const errors = values.map(
    value => List(validators)
      .map(validator => validator(value, options))
      .filter(error => error),
  );

  return errors.some(error => error.size > 0)
    && Map({
      errors, // TODO maybe add an error message? message/messageLocale
      list: true,
    });
};
