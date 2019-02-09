import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useDefault } from '@gnowth/default';

import defaultHooks from './control.hooks';

const mapDefault = {
  component: ['entityForm_button', 'component_button'],
  errorBoundaryComponent: ['entityForm_errorBoundary', 'component_errorBoundary'],
};

function Control(props) {
  const hooks = Object.assign({}, defaultHooks, props.hooks);
  const Components = useDefault(mapDefault, props);

  return (
    <Components.errorBoundaryComponent {...hooks.useGetPropsComponentErrorBoundary(props, Components)}>
      <Components.component {...hooks.useGetPropsComponent(props, Components.component)} />
    </Components.errorBoundaryComponent>
  );
}

Control.propTypes = exact({
  action: PropTypes.func.isRequired,
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  errorBoundaryComponent: PropTypesPlus.component,
  errorBoundaryComponentProps: PropTypes.shape({}),
  event: PropTypesPlus.string,
  hooks: PropTypes.exact({
    useGetPropsComponent: PropTypes.func,
    useGetPropsComponentErrorBoundary: PropTypes.func,
  }),
});

Control.defaultProps = {
  component: undefined,
  componentProps: {},
  errorBoundaryComponent: undefined,
  errorBoundaryComponentProps: {},
  event: 'onClick',
  hooks: undefined,
};

export default React.memo(Control);
