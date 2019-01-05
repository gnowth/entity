import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';
import { Map } from 'immutable';

import UITypeSet from '../TypeSet';

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

UIError.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypesImmutable.map,
  ]),
};

UIError.defaultProps = {
  children: undefined,
};

export default UIError;
