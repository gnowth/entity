import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colorFromPalette, mixins, withEnhanceProps } from '@burnsred/theme';

const UILine = withEnhanceProps(styled.hr`
  border: 0;
  border-bottom: 1px ${props => props.borderStyle || 'solid'} ${colorFromPalette()};

  ${mixins.margin}
  ${props => props.css}
`);

UILine.propTypes = {
  namespace: PropTypes.string,
  variant: PropTypes.string,
};

UILine.defaultProps = {
  namespace: 'component_uiLine',
  variant: undefined,
};

export default UILine;
