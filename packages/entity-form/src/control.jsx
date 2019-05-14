import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { useDefault } from '@burnsred/default';

import defaultHooks from './control.hooks';

const mapDefault = {
  component: ['entityForm_button', 'component_button'],
  errorBoundaryComponent: ['entityForm_errorBoundary', 'component_errorBoundary'],
};

function Control(props) {
  const hooks = { ...defaultHooks, ...props.hooks };
  const Components = useDefault(mapDefault, props);

  return (
    <Components.errorBoundaryComponent {...hooks.usePropsErrorBoundary(props, Components)}>
      <Components.component {...hooks.usePropsComponent(props, Components.component)} />
    </Components.errorBoundaryComponent>
  );
}

Control.propTypes = exact({
  action: PropTypes.func.isRequired,
  array: PropTypes.bool,
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  errorBoundaryComponent: PropTypesPlus.component,
  errorBoundaryComponentProps: PropTypes.shape({}),
  event: PropTypesPlus.string,
  hooks: PropTypes.exact({
    usePropsComponent: PropTypes.func,
    usePropsErrorBoundary: PropTypes.func,
  }),
  name: PropTypesPlus.string,
  submit: PropTypes.bool,
});

Control.defaultProps = {
  array: false,
  component: undefined,
  componentProps: {},
  errorBoundaryComponent: undefined,
  errorBoundaryComponentProps: {},
  event: 'onClick',
  hooks: undefined,
  name: undefined,
  submit: false,
};

export default React.memo(Control);
