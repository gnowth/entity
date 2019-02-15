import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useDefaultStyle } from '@gnowth/style';

import UIIcon from '../Icon';
import defaultHooks from './Tooltip.hooks';
import defaultStyles, { Popup, Wrapper } from './Tooltip.styles';

function UITooltip(props) {
  const hooks = { ...defaultHooks, ...props.hooks };
  const styles = useDefaultStyle(defaultStyles, props.styles);
  const Component = props.component;
  const [hidden, setHidden] = React.useState(true);

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
