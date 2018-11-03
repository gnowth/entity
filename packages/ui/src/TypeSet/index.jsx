import _flowRight from 'lodash/flowRight';
import styled from 'styled-components';
import { withProps } from '@gnowth/higher-order-component';
import { injectIntl } from 'react-intl';

// TODO remove check in there an move outside?
const TypeSet = styled.span`
  ${(props) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!props.theme.typesets[props.name]) throw new Error(`TypeSet: name "${props.name}" must be a value in props.theme.typesets`);
    }

    return props.theme.typesets[props.name];
  }}
`;

export default _flowRight(
  injectIntl,
  withProps(props => ({
    as: props.component,
    children: props.children || props.intl.formatMessage(props.locale, props.values),
    // themeVariant: props.theme.typesets[props.variant],
  })),
)(TypeSet);
