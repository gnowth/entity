import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';

import * as SC from './style';

const IconOption = ({ value, children, ...props }) => (
  <SC.IconRoot {...props}>
    { value.get('icon_name') &&
      <SC.IconWrapper>
        <SC.Icon name={value.get('icon_name')} />
      </SC.IconWrapper>
    }

    <SC.IconLabel>{ children }</SC.IconLabel>
  </SC.IconRoot>
);

IconOption.propTypes = {
  value: PropTypesImmutable.map.isRequired,
  disabled: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default IconOption;
