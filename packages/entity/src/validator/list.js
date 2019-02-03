import { List, Map } from 'immutable';

export default validators => (values, configs) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!List.isList(values)) throw new Error('validators.list: "values" must be a list');
  }

  const errors = values.map(
    value => List(validators)
      .map(validator => validator(value, configs))
      .filter(error => error),
  );

  return errors.some(error => error.size > 0)
    && Map({
      errors,
      list: true,
      message: 'Invalid list',
    });
};
