import _flowRight from 'lodash/flowRight';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withProps, withPropsFiltered } from '@gnowth/higher-order-component';
import { injectIntl } from 'react-intl';

const WidgetInput = styled(withPropsFiltered('input'))`
  width: 100%;

  ${props => props.theme.components?.widgetInput?.[props.variant]}
  ${props => props.css}
`;

WidgetInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  variant: PropTypes.string,
};

WidgetInput.defaultProps = {
  value: '',
  variant: 'main',
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
