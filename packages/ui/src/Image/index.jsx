import _flowRight from 'lodash/flowRight';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { withProps } from '@gnowth/higher-order-component';

const UIImage = styled.img`
  ${props => props.theme.components?.[props.variant]}
  ${props => props.css}
`;

UIImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

UIImage.defaultProps = {
  variant: 'main',
};

export default _flowRight(
  withTheme,
  withProps(props => ({
    alt: props.name,
    src: props.theme.images?.[props.name],
  })),
)(UIImage);
