import _flowRight from 'lodash/flowRight';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { withProps } from '@gnowth/higher-order-component';
import { injectIntl } from 'react-intl';

const TypeSet = styled.span`
  ${props => props.theme.typesets?.[props.variant]}
  ${props => props.css}
`;

TypeSet.propTypes = {
  css: PropTypesPlus.css,
  variant: PropTypes.string,
};

TypeSet.defaultProps = {
  css: undefined,
  variant: 'text',
};

// TODO check if locale is an immutable and convert to JS
// TODO check if locale contains translations and wrap component with an intlProvider
export default _flowRight(
  injectIntl,
  withProps(props => ({
    as: props.component,
    children: props.children || props.intl.formatMessage(props.locale, props.values),
  })),
)(TypeSet);
