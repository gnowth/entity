import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhance } from '@private/hooks';

import UIIcon from '../Icon';
import hooks from './Tooltip.hooks';
import styles, { Popup, Wrapper } from './Tooltip.styles';

function UITooltip(props) {
  const [hidden, setHidden] = React.useState(true);
  const enhancedProps = useEnhance(props, { hooks, styles });
  const Component = enhancedProps.component;

  return (
    <Wrapper
      className={enhancedProps.className}
      css={enhancedProps.css}
    >
      <Component {...enhancedProps.hooks.usePropsTrigger(enhancedProps, enhancedProps.styles, hidden, setHidden)} />

      <Popup hidden={hidden}>
        { enhancedProps.children }
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
  hooks: PropTypes.exact({
    usePropsTrigger: PropTypes.func,
  }),
  styles: PropTypes.exact({
    icon: PropTypesPlus.css,
  }),
};

UITooltip.defaultProps = {
  component: UIIcon,
  componentProps: {},
  css: undefined,
  event: 'onClick',
  hooks: undefined,
  styles: undefined,
};

export default React.memo(UITooltip);
