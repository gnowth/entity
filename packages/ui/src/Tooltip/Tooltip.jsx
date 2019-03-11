import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@gnowth/style';


import UIIcon from '../Icon';
import hooks from './Tooltip.hooks';
import styles, { Popup, Wrapper } from './Tooltip.styles';

function UITooltip(_props) {
  const [hidden, setHidden] = React.useState(true);
  const props = useEnhanceProps(_props, { hooks, styles });
  const Component = props.component;

  return (
    <Wrapper
      className={props.className}
      css={props.css}
    >
      <Component {...props.hooks.usePropsTrigger(props, props.styles, hidden, setHidden)} />

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
  namespace: PropTypesPlus.string,
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
  namespace: 'component_uiTooltip',
  styles: undefined,
};

export default React.memo(UITooltip);
