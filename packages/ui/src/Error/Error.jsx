import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';
import { Map } from 'immutable';

import UIType from '../Type';

const UIError = props => (
  <UIType
    variant="body2"
    palette="danger"
    {...props}
  >
    { Map.isMap(props.children)
      ? props.children.get('message')
      : props.children
    }
  </UIType>
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

export default React.memo(UIError);
