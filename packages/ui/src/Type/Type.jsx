import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhance } from '@private/hooks';

import hooks from './Type.hooks';

function UIType(props) {
  const enhancedProps = useEnhance(props, { hooks });
  const Component = enhancedProps.hooks.useComponent(enhancedProps);

  return (
    <Component {...enhancedProps.hooks.useProps(enhancedProps)}>
      { enhancedProps.hooks.useChildren(enhancedProps) }
    </Component>
  );
}

const PropTypesChildren = PropTypes.oneOfType([
  PropTypes.string,
  PropTypesPlus.locale,
  PropTypesImmutable.map,
]);

UIType.propTypes = {
  as: PropTypesPlus.component,
  children: PropTypesChildren,
  className: PropTypesPlus.string,
  hidden: PropTypes.bool,
  hooks: PropTypes.exact({
    useChildren: PropTypes.func,
    useComponent: PropTypes.func,
    useProps: PropTypes.func,
  }),
  namespace: PropTypesPlus.string,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  variant: PropTypes.string,

  // form props
  errors: PropTypesImmutable.list,
  field: PropTypes.shape({
    toString: PropTypes.func.isRequired,
  }),
  mediaPrintDisabled: PropTypes.bool,
  name: PropTypesPlus.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onSubmit: PropTypes.func,
  options: PropTypesImmutable.list,
  processing: PropTypes.bool,
  processingDidFail: PropTypes.bool,
  value: PropTypesChildren,
  valueInitial: PropTypesChildren,
};

UIType.defaultProps = {
  as: undefined,
  children: undefined,
  className: '',
  hidden: undefined,
  hooks: undefined,
  mediaPrintDisabled: undefined,
  namespace: 'component_uiType',
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
  variant: undefined,

  // form props
  errors: undefined,
  field: undefined,
  name: undefined,
  onChange: undefined,
  onInputChange: undefined,
  onSubmit: undefined,
  options: undefined,
  processing: undefined,
  processingDidFail: undefined,
  value: undefined,
  valueInitial: undefined,
};

export default React.memo(UIType);
