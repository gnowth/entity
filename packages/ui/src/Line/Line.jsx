import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colorFromPalette, mixin, withEnhanceProps } from '@gnowth/theme';

const UILine = withEnhanceProps(styled.hr`
  border: 0;
  border-bottom: 1px ${props => props.borderStyle || 'solid'} ${colorFromPalette()};

  ${mixin({ name: 'margin' })}
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
