import cn from 'classnames';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import 'font-awesome/css/font-awesome.css';

const UIIconFontAwesome = styled.i.attrs({
  className: props => cn(`fa fa-${props.name}`, props.className),
})`
  color: ${props => props.color};

  && {
    font-size: ${props => props.size};
  }
`;

UIIconFontAwesome.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

UIIconFontAwesome.defaultProps = {
  size: 'inherit',
  color: 'inherit',
};

export default UIIconFontAwesome;
