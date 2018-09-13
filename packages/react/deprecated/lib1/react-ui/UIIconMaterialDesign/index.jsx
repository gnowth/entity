import cn from 'classnames';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import 'material-design-icons/iconfont/material-icons.css';

const UIIconMaterialDesign = styled.i.attrs({
  className: props => cn('material-icons', props.className),
  children: props => props.name,
})`
  color: ${props => props.color};

  && {
    font-size: ${props => props.size};
  }
`;

UIIconMaterialDesign.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

UIIconMaterialDesign.defaultProps = {
  size: 'inherit',
  color: 'inherit',
};

export default UIIconMaterialDesign;
