import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mixins, withEnhanceProps } from '@burnsred/theme';

const UISpacer = withEnhanceProps(styled.div`
  flex: ${props => (props.flex === undefined ? 1 : props.flex)};

  ${mixins.space}
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
