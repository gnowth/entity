import cn from 'classnames';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import 'assets/fonts/icon-font.css';

const UIIcon = styled.i.attrs({
  className: props => cn(`icon-${props.name}`, props.className),
})`
  font-size: ${props => props.size};
  color: ${props => props.color};
  line-height: 1;
`;

UIIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

UIIcon.defaultProps = {
  size: 'inherit',
  color: 'inherit',
};

export default UIIcon;
