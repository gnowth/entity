import _isFunction from 'lodash/fp/isFunction';
import cn from 'classnames';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { withPropMapper } from '@gnowth/higher-order-component';

// TODO check what to do with css
import 'material-design-icons/iconfont/material-icons.css';
import 'font-awesome/css/font-awesome.css';

const UIIcon = styled.i`
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

export default withPropMapper(props => ({
  className: cn({
    'material-icons': !props.fontawesome,
    [`fa fa-${props.name}`]: props.fontawesome,
    [props.className]: props.className,
  }),
  children: props.fontawesome ? props.children : props.name,
}))(UIIcon);
