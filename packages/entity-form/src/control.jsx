import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useDefault } from '@gnowth/default';

import defaultHooks from './control.hooks';

const mapDefault = {
  component: ['entityForm_button', 'component_button'],
};

function Control(props) {
  const hooks = Object.assign({}, defaultHooks, props.hooks);
  const Component = useDefault(mapDefault, props).component;

  return <Component {...hooks.useGetPropsComponent(props, Component)} />;
}

Control.propTypes = exact({
  action: PropTypes.func.isRequired,
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  event: PropTypesPlus.string,
  hooks: PropTypes.exact({
    useGetPropsComponent: PropTypes.func,
  }),
});

Control.defaultProps = {
  component: undefined,
  componentProps: {},
  event: 'onClick',
  hooks: undefined,
};

export default React.memo(Control);
