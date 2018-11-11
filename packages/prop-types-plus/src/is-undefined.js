export default (props, propName, componentName) => props[propName] !== undefined
  && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Must be "undefined"`);
