import React from 'react';

import UITypeSet from '../TypeSet';

// TODO add default error if error is just false? error should be a children
// TODO use variant
const UIError = props => (
  <UITypeSet
    name="text"
    {...props}
  />
);

export default UIError;
