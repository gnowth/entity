import _isFunction from 'lodash/fp/isFunction';
import cn from 'classnames';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// TODO check what to do with css
import 'material-design-icons/iconfont/material-icons.css';
import 'font-awesome/css/font-awesome.css';

const UIIcon = styled.i.attrs({
  className: props => cn({
    'material-icons': !props.fontawesome,
    [`fa fa-${props.name}`]: props.fontawesome,
    [props.className]: props.className,
  }),
  children: props => (props.fontawesome ? props.children : props.name),
})`
  ${props => props.iconColor && css`
    color: ${_isFunction(props.iconColor) ? props.iconColor(props.theme) : props.iconColor};
  `}

  ${props => props.iconSize && css`
    && {
      font-size: ${_isFunction(props.iconSize) ? props.iconSize(props.theme) : props.iconSize};
    }
  `}
`;

UIIcon.propTypes = {
  name: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  iconSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

UIIcon.defaultProps = {
  iconSize: undefined,
  iconColor: undefined,
};

export default UIIcon;
