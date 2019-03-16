import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mixins, withEnhanceProps } from '@gnowth/theme';

const UISpacer = withEnhanceProps(styled.div`
  flex: ${props => (props.flex === undefined ? 1 : props.flex)};

  ${mixins.margin}
  ${mixins.padding}
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
