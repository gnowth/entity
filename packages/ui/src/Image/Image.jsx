import _flowRight from 'lodash/flowRight';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { withProps } from '@gnowth/higher-order-component';
import { component } from '@gnowth/style';

const UIImage = styled.img`
  ${component({ name: 'uiImage' })}
  ${props => props.css}
`;

UIImage.propTypes = {
  alt: PropTypes.string.isRequired,
  css: PropTypesPlus.css,
  src: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

UIImage.defaultProps = {
  css: undefined,
  variant: 'main',
};

export default _flowRight(
  withTheme,
  withProps(props => ({
    alt: props.name,
    src: props.theme.images?.[props.name],
  })),
)(UIImage);
