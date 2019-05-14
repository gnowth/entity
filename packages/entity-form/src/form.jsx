import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';

import { FormProvider } from './context';
import defaultHooks from './form.hooks';

function Form(props) {
  const Component = props.component;
  const hooks = { ...defaultHooks, ...props.hooks };

  return (
    <FormProvider {...hooks.useProps(props)}>
      <Component
        className={props.className}
        {...props.componentProps}
      >
        { props.children }
      </Component>
    </FormProvider>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  errors: PropTypesImmutable.list.isRequired,
  field: PropTypesEntity.entityField.isRequired,
  hooks: PropTypes.shape({
    useProps: PropTypes.func,
  }),
  name: PropTypesPlus.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypesImmutable.map.isRequired,
  valueInitial: PropTypesImmutable.map,
};

Form.defaultProps = {
  component: 'div',
  componentProps: {},
  name: undefined,
  hooks: undefined,
  valueInitial: undefined,
};

export default React.memo(Form);
