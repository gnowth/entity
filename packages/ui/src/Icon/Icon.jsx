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
    font-size: ${props => props.size || '1rem'};
  }

  ${props => props.palette && css`
    color: ${colorFromPalette()};
  `}

  ${props => props.margin && css`
    margin: ${props.margin};
  `}

  ${props => props.padding && css`
    padding: ${props.padding};
  `}

  ${component()}
  ${props => props.css}
`;

UIIcon.propTypes = {
  fontawesome: PropTypes.bool,
  hidden: PropTypes.bool,
  material: PropTypes.bool,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  namespace: PropTypes.string,
  padding: PropTypes.string,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
};

UIIcon.defaultProps = {
  fontawesome: false,
  hidden: undefined,
  material: false,
  margin: undefined,
  namespace: 'component_uiIcon',
  padding: undefined,
  palette: undefined,
  paletteAsBackground: false,
  paletteWeight: undefined,
  size: undefined,
  variant: 'standard',
};

export default UIIcon;
