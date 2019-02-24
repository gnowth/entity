import classnames from 'classnames';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { colorFromPalette, component } from '@gnowth/style';

const UIIcon = styled.i.attrs(props => ({
  className: classnames({
    'material-icons': props.material,
    [`fa fa-${props.name}`]: props.fontawesome,
    [`icon icon-${props.name}`]: !props.fontawesome && !props.material,
    [props.className]: props.className,
  }),
  children: props.material ? props.name : props.children,
}))`
  && {
    font-size: 1rem;
  }

  ${props => props.palette && css`
    color: ${colorFromPalette()};
  `}

  ${component()}
  ${props => props.css}
`;

UIIcon.propTypes = {
  fontawesome: PropTypes.bool,
  hidden: PropTypes.bool,
  material: PropTypes.bool,
  name: PropTypes.string.isRequired,
  namespace: PropTypes.string,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  variant: PropTypes.string,
};

UIIcon.defaultProps = {
  fontawesome: false,
  hidden: undefined,
  material: false,
  namespace: 'component_uiIcon',
  palette: undefined,
  paletteAsBackground: false,
  paletteWeight: undefined,
  variant: 'standard',
};

export default UIIcon;
