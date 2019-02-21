import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useThemeComponent } from '@gnowth/style';

import defaultHooks from './Type.hooks';

function UIType(props) {
  const computedProps = useThemeComponent({ name: 'uiType' }, props);
  const hooks = { ...defaultHooks, ...computedProps.hooks };
  const Component = hooks.useComponent(computedProps);

  return (
    <Component {...hooks.usePropsComponent(computedProps)}>
      { hooks.useChildren(computedProps) }
    </Component>
  );
}

const PropTypesChildren = PropTypes.oneOfType([
  PropTypes.string,
  PropTypesPlus.locale,
  PropTypesImmutable.map,
]);

UIType.propTypes = {
  children: PropTypesChildren,
  className: PropTypesPlus.string,
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  hidden: PropTypes.bool,
  hooks: PropTypes.exact({
    useChildren: PropTypes.func,
    useComponent: PropTypes.func,
    usePropsComponent: PropTypes.func,
  }),
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  variant: PropTypes.string,

  // form props
  errors: PropTypesImmutable.list,
  field: PropTypes.shape({
    toString: PropTypes.func.isRequired,
  }),
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
  children: undefined,
  className: '',
  component: undefined,
  componentProps: undefined,
  hidden: undefined,
  hooks: undefined,
  palette: undefined,
  paletteAsBackground: false,
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
