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

export default _flowRight(
  injectIntl,
  withProps(props => ({
    as: props.component === null
      ? ({ children }) => children
      : props.component,
    children: props.children === undefined
      ? props.intl.formatMessage(props.locale, props.values)
      : props.children,
  })),
)(TypeSet);
