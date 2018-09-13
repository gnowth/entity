import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map, List } from 'immutable';
import { createSelector } from 'reselect';

import PropTypesEntity from 'lib/prop-types/Entity';
import PropTypesPlus from 'lib/prop-types/Plus';

import { Provider } from './components/base';

class Form extends React.Component {
  errorSelector = createSelector(
    x => x,
    (value) => {
      const errors = this.props.field.entity.validate(value);

      return errors.size === 0
        ? List()
        : List([Map({
          errors,
          entityError: true,
        })]);
    },
  );

  handleChange = ({ target: { name, value } }) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!Map.isMap(value) && value !== null) throw new Error(`entity-form (context.onChange): Value must either be a "Map" or "null". Refer to form named "${this.props.name}"`);
      if (name !== this.props.name) throw new Error(`entity-form (context.onChange): Name cannot be different from Form name "${this.props.name}"`);
    }

    return this.props.onChange && this.props.onChange({
      target: {
        value,
        name: this.props.name,
      },
    });
  }

  handleItemChange = ({ target: { name, value }, recordWillChange = ({ nextRecord }) => nextRecord }) => {
    const nextValue = recordWillChange({
      name: this.props.name,
      field: this.props.field,
      record: this.props.value,
      nextRecord: this.props.value.merge(
        Array.isArray(name)
          ? value
            .filter((_, key) => name.includes(key))
            .map((val, key) => this.props.field.getField(key).clean(val))
          : Map({ [name]: this.props.field.getField(name).clean(value) }),
      ),
    });

    return this.props.onChange && this.props.onChange({
      target: {
        name: this.props.name,
        value: Array.isArray(this.props.name)
          ? nextValue
          : this.props.field.entity.clean(nextValue),
      },
    });
  };

  render() {
    const Component = this.props.component;
    const errors = this.props.errors === undefined
      ? this.errorSelector(this.props.value)
      : this.props.errors;

    return (
      <Component
        {...(typeof Component === 'symbol' ? {} : { className: this.props.className })}
        {...this.props.componentProps}
      >
        <Provider
          value={{
            name: this.props.name,
            value: this.props.value,
            defaultValue: this.props.defaultValue,
            field: this.props.field,
            record: this.props.record,
            onItemChange: this.handleItemChange,
            onChange: this.handleChange,
            disabled: this.props.disabled,
            readOnly: this.props.readOnly,
            errors: errors.filterNot(error => error.get('entityError')),
            entityErrors: errors.filter(error => error.get('entityError')),
            mapProps: this.props.mapProps,
          }}
        >
          { this.props.children }
        </Provider>
      </Component>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node,
  name: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]).isRequired,

  value: PropTypesImmutable.map.isRequired,
  defaultValue: PropTypesImmutable.map,
  record: PropTypesImmutable.map,
  onChange: PropTypesPlus.isRequiredIfNot('readOnly', PropTypes.func),
  field: PropTypesEntity.entityField.isRequired,
  mapProps: PropTypes.shape({}),

  // status
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,

  // component
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
    PropTypes.symbol.isRequired,
  ]),
  componentProps: PropTypes.shape({}),

  // errors
  errors: PropTypesImmutable.list,
};

Form.defaultProps = {
  children: undefined,
  defaultValue: undefined,
  onChange: undefined,
  record: null,
  mapProps: {},

  // status
  disabled: false,
  readOnly: false,

  // component
  component: 'div',
  componentProps: {},

  // errors
  errors: undefined,
};

export default Form;
