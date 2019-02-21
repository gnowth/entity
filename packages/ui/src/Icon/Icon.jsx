import classnames from 'classnames';
import styled from 'styled-components';
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

  color: ${colorFromPalette()};

  ${component({ name: 'uiIcon' })}
`;

UIIcon.propTypes = {
  fontawesome: PropTypes.bool,
  hidden: PropTypes.bool,
  material: PropTypes.bool,
  name: PropTypes.string.isRequired,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  variant: PropTypes.string,
};

UIIcon.defaultProps = {
  fontawesome: false,
  hidden: undefined,
  material: false,
  palette: undefined,
  paletteAsBackground: false,
  paletteWeight: undefined,
  variant: 'standard',
  visible: true,
};

export default UIIcon;
