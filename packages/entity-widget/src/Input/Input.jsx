import _flowRight from 'lodash/flowRight';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withProps, withPropsFiltered } from '@gnowth/higher-order-component';
import { component } from '@gnowth/style';
import { injectIntl } from 'react-intl';

const WidgetInput = styled(withPropsFiltered('input'))`
  width: 100%;

  ${component({ branch: 'css' })}
  ${props => props.css}
`;

WidgetInput.propTypes = {
  name: PropTypes.string.isRequired,
  namespace: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  variant: PropTypes.string,
};

WidgetInput.defaultProps = {
  namespace: 'component_widgetInput',
  value: '',
  variant: 'standard',
};

export default _flowRight(
  injectIntl,
  withProps(props => ({
    placeholder: props.placeholder === undefined && props.placeholderLocale
      ? props.intl.formatMessage(props.placeholderLocale)
      : props.placeholder,
    placeholderLocale: undefined,
  })),
)(WidgetInput);
