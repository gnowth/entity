import classnames from 'classnames';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { withProps } from '@gnowth/higher-order-component';

const UIIcon = styled.i`
  && {
    font-size: 1rem;
  }

  ${props => props.theme?.components?.uiIcon?.[props.variant]}
  ${props => props.css}
`;

UIIcon.propTypes = {
  css: PropTypesPlus.css,
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

UIIcon.defaultProps = {
  css: undefined,
  variant: 'main',
};

export default withProps(props => ({
  className: classnames({
    'material-icons': props.material,
    [`fa fa-${props.name}`]: props.fontawesome,
    [`icon icon-${props.name}`]: !props.fontawesome && !props.material,
    [props.className]: props.className,
  }),
  children: props.material ? props.name : props.children,
}))(UIIcon);
