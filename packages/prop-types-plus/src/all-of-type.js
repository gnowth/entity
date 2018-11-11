import withRequired from './with-required';

export default (propTypes = []) => withRequired(
  (...args) => propTypes.find(propType => propType(...args))?.(...args),
);
