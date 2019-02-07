import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useDefaultStyle } from '@gnowth/style';

import UIIcon from '../Icon';
import defaultHooks from './Tooltip.hooks';
import defaultStyles, { Popup, Wrapper } from './Tooltip.styles';

const UITooltip = (props) => {
  const hooks = Object.assign({}, defaultHooks, props.hooks);
  const [hidden, setHidden] = React.useState(true);
  const styles = useDefaultStyle(defaultStyles, props.styles);
  const Component = props.component;

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
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  css: PropTypesPlus.css,
  event: PropTypes.string,
  hooks: PropTypes.exact({
    useGetPropsTrigger: PropTypes.func,
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
