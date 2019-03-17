import withRequired from './with-required';

export default (propTypes = []) => withRequired(
  (...args) => {
    const result = propTypes.find(propType => propType(...args));

    return result && result(...args);
  },
);
