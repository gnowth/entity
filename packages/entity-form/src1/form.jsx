import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Map } from 'immutable';

import { FormProvider } from './context';

class Form extends React.Component {
  handleChange = ({ target }) => {
    if (process.env.NODE_ENV !== 'production') {
      if (target.name !== this.props.name) throw new Error(`Form.handleChange (${this.props.name}): different name provided "${target.name}"`);
      if (target.index === null) throw new Error(`Form.handleChange (${this.props.name}): index cannot be null`);
      if (!target.array && !Map.isMap(target.value) && target.value !== null) throw new Error(`Form.handleChange (${this.props.name}): Value must either be a "Map" or "null".`);
    }

    return this.props.onChange({ target });
  };

  getProps() {
    return {
      formDisabled: this.props.disabled,
      formErrors: this.props.errors,
      formField: this.props.field,
      formIndex: this.props.index,
      formName: this.props.name,
      formNameMapper: this.props.nameMapper,
      formOnChange: this.handleChange,
      formReadOnly: this.props.readOnly,
      formValue: this.props.value,
      formValueInitial: this.props.valueInitial,
    };
  }

  render() {
    const Component = this.props.component;

    return (
      <FormProvider {...this.getProps()}>
        <Component
          className={this.props.className}
          {...this.props.componentProps}
        >
          { this.props.children }
        </Component>
      </FormProvider>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  css: PropTypesPlus.css,
  disabled: PropTypes.bool,
  errors: PropTypesImmutable.list.isRequired,
  field: PropTypesEntity.entityField.isRequired,
  index: PropTypes.number,
  name: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ]),
  nameMapper: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypesImmutable.map.isRequired,
  valueInitial: PropTypesImmutable.map,
};

Form.defaultProps = {
  component: 'div',
  componentProps: {},
  css: undefined,
  disabled: false,
  index: undefined,
  name: undefined,
  nameMapper: {},
  readOnly: false,
  valueInitial: undefined,
};

export default Form;
