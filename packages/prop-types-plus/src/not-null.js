export default (props, propName, componentName) => props[propName] === null
  && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Must not be "null"`);
