import { isValidElementType } from 'react-is';

import withRequired from './with-required';

export default withRequired(
  (props, propName, componentName) => (
    !props[propName] || isValidElementType(props[propName])
      ? undefined
      : new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Must be a valid component.`)
  ),
);
