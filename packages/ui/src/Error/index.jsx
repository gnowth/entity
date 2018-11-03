import React from 'react';
import { Map } from 'immutable';

import UITypeSet from '../TypeSet';

// TODO add default error if error is just false? error should be a children
// TODO use variant
const UIError = props => (
  <UITypeSet
    name="text"
    variant="text_danger"
    {...props}
  >
    { Map.isMap(props.children)
      ? props.children.get('message')
      : props.children
    }
  </UITypeSet>
);

export default UIError;
