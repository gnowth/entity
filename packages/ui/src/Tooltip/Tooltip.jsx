import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@burnsred/theme';

import UIIcon from '../Icon';
import hooks from './Tooltip.hooks';
import styles, { Popup, Wrapper } from './Tooltip.styles';

function UITooltip(_props) {
  const [hidden, setHidden] = React.useState(true);
  const props = useEnhanceProps(_props);
  const Component = props.component;

  return (
    <Wrapper
      className={props.className}
      css={props.css}
    >
      <Component {...hooks.usePropsTrigger(props, styles, hidden, setHidden)} />

      <Popup hidden={hidden}>
        { props.children }
      </Popup>
    </Wrapper>
  );
}

UITooltip.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  css: PropTypesPlus.css,
  event: PropTypes.string,
  namespace: PropTypesPlus.string,
};

UITooltip.defaultProps = {
  component: UIIcon,
  componentProps: {},
  css: undefined,
  event: 'onClick',
  namespace: 'component_uiTooltip',
};

export default React.memo(UITooltip);
