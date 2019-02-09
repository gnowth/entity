import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import { FormProvider } from './context';
import defaultHooks from './form.hooks';

function Form(props) {
  const Component = props.component;
  const hooks = Object.assign({}, defaultHooks, props.hooks);

  return (
    <FormProvider {...hooks.useGetProps(props)}>
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
    useGetProps: PropTypes.func,
  }),
  name: PropTypesPlus.string,
  onChange: PropTypes.func.isRequired,
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
