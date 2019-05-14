import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withProps, withPropsFiltered } from '@burnsred/higher-order-component';
import { component } from '@burnsred/theme';
import { injectIntl } from 'react-intl';

const WidgetInput = styled(withPropsFiltered('input'))`
  width: 100%;

  ${component({ branch: 'css' })}
  ${props => props.css}
`;

WidgetInput.propTypes = {
  name: PropTypes.string.isRequired,
  namespace: PropTypes.string,
  variant: PropTypes.string,
};

WidgetInput.defaultProps = {
  namespace: 'component_widgetInput',
  variant: 'standard',
};

export default _.flowRight([
  injectIntl,
  withProps(props => ({
    placeholder: props.placeholder === undefined && props.placeholderLocale
      ? props.intl.formatMessage(props.placeholderLocale)
      : props.placeholder,
    placeholderLocale: undefined,
  })),
])(WidgetInput);
