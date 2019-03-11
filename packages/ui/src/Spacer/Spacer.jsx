import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mixin, withEnhanceProps } from '@gnowth/style';

const UISpacer = withEnhanceProps(styled.div`
  flex: ${props => (props.flex === undefined ? 1 : props.flex)};

  ${mixin({ name: 'margin' })}
  ${mixin({ name: 'padding' })}
`);

UISpacer.propTypes = {
  namespace: PropTypes.string,
  variant: PropTypes.string,
};

UISpacer.defaultProps = {
  namespace: 'component_uiSpacer',
  variant: 'standard',
};

export default UISpacer;
