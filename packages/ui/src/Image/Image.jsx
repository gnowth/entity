import _flowRight from 'lodash/flowRight';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { withProps } from '@gnowth/higher-order-component';
import { component, image } from '@gnowth/style';

const UIImage = styled.img`
  ${component()}
  ${props => props.css}
`;

UIImage.propTypes = {
  alt: PropTypes.string.isRequired,
  css: PropTypesPlus.css,
  namespace: PropTypesPlus.string,
  src: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

UIImage.defaultProps = {
  css: undefined,
  namespace: 'component_uiImage',
  variant: 'standard',
};

export default _flowRight(
  withTheme,
  withProps(props => ({
    alt: props.name,
    src: image(props),
  })),
)(UIImage);
