import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@gnowth/style';

import hooks from './Type.hooks';

function UIType(_props) {
  const props = useEnhanceProps(_props, { hooks });
  const Component = props.hooks.useComponent(props);

  return (
    <Component {...props.hooks.useProps(props)}>
      { props.hooks.useChildren(props) }
    </Component>
  );
}

UIType.propTypes = {
  as: PropTypesPlus.component,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypesPlus.typography,
  ]),
  className: PropTypesPlus.string,
  field: PropTypes.shape({
    toString: PropTypes.func.isRequired,
  }),
  hidden: PropTypes.bool,
  hooks: PropTypes.exact({
    useChildren: PropTypes.func,
    useComponent: PropTypes.func,
    useProps: PropTypes.func,
  }),
  intlContext: PropTypes.shape({}),
  mediaPrintDisabled: PropTypes.bool,
  namespace: PropTypesPlus.string,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypesPlus.typography,
    PropTypesPlus.value,
  ]),
  variant: PropTypes.string,
};

UIType.defaultProps = {
  as: undefined,
  children: undefined,
  className: '',
  field: undefined,
  hidden: undefined,
  hooks: undefined,
  intlContext: undefined,
  mediaPrintDisabled: undefined,
  namespace: 'component_uiType',
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
  value: undefined,
  variant: undefined,
};

export default React.memo(UIType);
