import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useDefaultStyle } from '@gnowth/style';

import UIIcon from '../Icon';
import defaultHooks from './Tooltip.hooks';
import defaultStyles, { Popup, Wrapper } from './Tooltip.styles';

const UITooltip = ({ Component, ...props }) => {
  const hooks = Object.assign({}, defaultHooks, props.hooks);
  const [hidden, setHidden] = React.useState(true);
  const styles = useDefaultStyle(defaultStyles, props.styles);

  return (
    <Wrapper
      className={props.className}
      css={props.css}
    >
      <Component {...hooks.useGetPropsTrigger(props, styles, hidden, setHidden)} />

      <Popup hidden={hidden}>
        { props.children }
      </Popup>
    </Wrapper>
  );
};

UITooltip.propTypes = {
  children: PropTypes.node.isRequired,
  componentProps: PropTypes.shape({}),
  css: PropTypesPlus.css,
  event: PropTypes.string,
  hooks: PropTypes.exact({
    useGetPropsTrigger: PropTypes.func,
  }),
  styles: PropTypes.exact({
    icon: PropTypesPlus.css,
  }),
  Component: PropTypesPlus.component,
};

UITooltip.defaultProps = {
  componentProps: {},
  css: undefined,
  event: 'onClick',
  hooks: undefined,
  styles: undefined,
  Component: UIIcon,
};

export default React.memo(UITooltip);
