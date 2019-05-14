import _ from 'lodash';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import { withProps } from '@burnsred/higher-order-component';
import { component, image } from '@burnsred/theme';

const UIImage = styled.img`
  ${component()}
  ${props => props.css}
`;

UIImage.propTypes = {
  alt: PropTypes.string.isRequired,
  namespace: PropTypesPlus.string,
  src: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

UIImage.defaultProps = {
  namespace: 'component_uiImage',
  variant: 'standard',
};

export default _.flowRight([
  withTheme,
  withProps(props => ({
    alt: props.name,
    src: image(props),
  })),
])(UIImage);
