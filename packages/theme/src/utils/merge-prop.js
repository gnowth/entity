export default (defaultProp) => (themeProp, componentProp) => Object.assign(
  {},
  defaultProp,
  themeProp,
  componentProp,
);
