import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map } from 'immutable';

import { Provider } from './context';

// TOADD Submit, Errors, Reset
class Form extends React.Component {
  handleChange = ({ target: { name, value } }) => {
    const newValue = this.props.value.set(name, value); // TODO set new value base on spec
    const nextValue = this.props.valueWillChange({
      value: this.props.value,
      nextValue: newValue,
      record: this.props.record,
    });

    this.props.onChange({
      target: {
        name: this.props.name,
        value: nextValue,
      },
    });
  }

  // TODO remove and improve, temporary for testing?
  handleRecordChange = ({ target: { value } }) => {
    const nextValue = this.props.valueWillChange({
      value: this.props.value,
      nextValue: value,
      record: this.props.record,
    });

    this.props.onChange({
      target: {
        name: this.props.name,
        value: nextValue,
      },
    });
  }

  render() {
    const Component = this.props.nested === 'true' ? 'fieldset' : 'form';

    return (
      <Component className={this.props.className}>
        <Provider
          value={{
            record: this.props.value,
            field: this.props.field,
            onChange: this.handleChange,
            onRecordChange: this.handleRecordChange,
            errors: Map(),
          }}
        >
          { this.props.children }
        </Provider>
      </Component>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string,
  value: PropTypesImmutable.map.isRequired,
  record: PropTypesImmutable.map,
  onChange: PropTypes.func.isRequired,

  // entity: PropTypes.object.isRequired,

  nested: PropTypes.string,
  valueWillChange: PropTypes.func,

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Form.defaultProps = {
  name: undefined,
  record: undefined,
  nested: 'false',
  valueWillChange: ({ nextValue }) => nextValue,
};

export default Form;
