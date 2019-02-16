import _flowRight from 'lodash/flowRight';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { withProps } from '@gnowth/higher-order-component';
import { component } from '@gnowth/style';
import { injectIntl } from 'react-intl';

const TypeSet = styled.pre`
  ${component({ name: 'uiType', branch: 'css' })}
  ${props => props.css}
`;

TypeSet.propTypes = {
  css: PropTypesPlus.css,
  variant: PropTypes.string,
};

TypeSet.defaultProps = {
  css: undefined,
  variant: 'body1',
};

export default _flowRight(
  injectIntl,
  withTheme,
  withProps(props => ({
    as: props.component === null
      ? ({ children }) => children
      : (props.component || component({ name: 'uiType', branch: 'component', defaultVariant: 'body1' })(props)),
    children: props.children === undefined
      ? props.intl.formatMessage(props.locale, props.values)
      : props.children,
  })),
)(TypeSet);
