import PropTypes from 'prop-types';
import React from 'react';

import PropTypesPlus from 'lib/prop-types/Plus';

import { FormProvider } from './context';

class Form extends React.Component {
  getProps() {
    return {
      formDisabled: this.props.disabled,
      // formError: this.props.errors,
      formField: this.props.field,
      formInitialValue: this.props.initialValue,
      formName: this.props.name,
      formNameMapper: this.props.nameMapper,
      formOnChange: this.handleChange,
      formOnItemChange: this.handleItemChange,
      formReadOnly: this.props.readOnly,
      formValue: this.props.value,
    };
  }

  handleChange = () => {

  };

  handleItemChange = () => {

  }

  render() {
    return (
      <FormProvider {...this.getProps()}>
        <this.props.component>
          { this.props.children }
        </this.props.component>
      </FormProvider>
    )
  }
}

Form.propTypes = {
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
};

Form.defaultProps = {
  component: 'div',
  componentProps: {},
};

export default Form;
