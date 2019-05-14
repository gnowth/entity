import idx from 'idx';
import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { useDefault } from '@burnsred/default';
import { useEnhanceProps } from '@burnsred/theme';

import hooks from './Type.hooks';

function render(props, intl) {
  const value = props.children || props.value;

  if (props.hidden) {
    return null;
  }

  if (value instanceof Error) {
    return value.message;
  }

  if (props.field) {
    return props.field.toString(value);
  }

  if (intl && idx(value, x => x.id)) {
    return intl.formatMessage(value, props.values);
  }

  return value;
}

const DummyContext = React.createContext({});
const mapDefault = {
  intlContext: ['uiType_context_intl', 'context_intl'],
};

function UIType(_props) {
  const props = useEnhanceProps(_props);
  const Component = hooks.useComponent(props);
  const { intlContext = DummyContext } = useDefault(mapDefault, props);
  const intl = React.useContext(intlContext);

  return (
    <Component {...hooks.useProps(props)}>
      { (props.render || render)(props, intl) }
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
  intlContext: PropTypes.shape({}),
  mediaPrintDisabled: PropTypes.bool,
  namespace: PropTypesPlus.string,
  palette: PropTypes.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
  render: PropTypes.func,
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
  intlContext: undefined,
  mediaPrintDisabled: undefined,
  namespace: 'component_uiType',
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
  render: undefined,
  value: undefined,
  variant: undefined,
};

export default React.memo(UIType);
