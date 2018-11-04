import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Map } from 'immutable';

import { FormProvider } from './context';

class Form extends React.Component {
  getProps() {
    return {
      formDisabled: this.props.disabled,
      formErrors: this.props.errors,
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
      if (!target.array && !Map.isMap(target.value) && target.value !== null) throw new Error(`entity-form (onChange): Value must either be a "Map" or "null". Refer to form named "${this.props.name}"`);
    }

    // TODO value can be a list and null
    return this.props.onChange({ target });
  };

  render() {
    return (
      <FormProvider {...this.getProps()}>
        <this.props.component
          className={this.props.className}
          css={this.props.css}
          {...this.props.componentProps}
        >
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
  css: PropTypesPlus.css,
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
  css: undefined,
  disabled: false,
  initialValue: undefined,
  name: undefined,
  nameMapper: {},
  readOnly: false,
};

export default Form;
