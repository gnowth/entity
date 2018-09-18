import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';
import { Map } from 'immutable';

import PropTypesEntity from 'lib/prop-types/Entity';
import PropTypesPlus from 'lib/prop-types/Plus';

import { FormProvider } from './context';

class Form extends React.Component {
  getProps() {
    return {
      formDisabled: this.props.disabled,
      formField: this.props.field,
      formIndex: this.props.index,
      formInitialValue: this.props.initialValue,
      formName: this.props.name,
      formNameMapper: this.props.nameMapper,
      formOnChange: this.handleChange,
      formReadOnly: this.props.readOnly,
      formValue: this.props.value,
    };
  }

  handleChange = ({ target }) => {
    if (process.env.NODE_ENV !== 'production') {
      if (target.index === null) throw new Error('entity-form (onChange): index cannot be null');
      if (target.name !== this.props.name) throw new Error(`entity-form (onChange): Name cannot be different from Form name "${this.props.name}"`);
      if (!Map.isMap(target.value) && target.value !== null) throw new Error(`entity-form (onChange): Value must either be a "Map" or "null". Refer to form named "${this.props.name}"`);
    }

    // TODO value can be a list and null
    return this.props.onChange({ target });
  };

  render() {
    return (
      <FormProvider {...this.getProps()}>
        <this.props.component {...this.props.componentProps}>
          { this.props.children }
        </this.props.component>
      </FormProvider>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  disabled: PropTypes.bool,
  field: PropTypesEntity.entityField.isRequired,
  initialValue: PropTypesImmutable.map,
  name: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ]),
  nameMapper: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypesImmutable.map.isRequired,
};

Form.defaultProps = {
  component: 'div',
  componentProps: {},
  disabled: false,
  initialValue: undefined,
  name: undefined,
  nameMapper: {},
  readOnly: false,
};

export default Form;
