import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { List, fromJS } from 'immutable';

import PropTypesEntity from 'lib/prop-types/Entity';

import * as SC from './style';

class WidgetSelect extends React.Component {
  handleChange = (value) => {
    const clearable = this.props.clearable === null
      ? this.props.field.blank
      : this.props.clearable;

    // Note(thierry): prevent change on backspace if not clearable
    const allowChange = clearable || !(
      value === null
      || (Array.isArray(value) && value.length === 0)
    );

    return allowChange && this.props.onChange({
      target: {
        value: fromJS(value),
        name: this.props.name,
      },
    });
  }

  render() {
    return (
      <SC.Root
        {...this.props}
        className={this.props.className}
        value={this.props.value && this.props.value.toJS()}
        onChange={this.handleChange}
        options={(this.props.options || List()).toJS()}
        valueKey={this.props.field.entity.idField}
        valueRenderer={value => this.props.field.entity.optionToString(value)}
        filterOptions={x => x}
        optionRenderer={option => this.props.field.entity.optionToString(option)}
        multi={this.props.field.many}
        isLoading={this.props.processing}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        clearable={
          this.props.clearable === null
            ? this.props.field.blank
            : this.props.clearable
        }
        arrowRenderer={() => (
          <SC.Icon
            name={this.props.field.many ? 'search' : 'chevron-down'}
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
            field={this.props.field}
            fontawesome
          />
        )}
      />
    );
  }
}

WidgetSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypesImmutable.map,
    PropTypesImmutable.list,
  ]),
  onChange: PropTypes.func.isRequired,
  options: PropTypesImmutable.list,
  processing: PropTypes.bool,
  field: PropTypesEntity.entityField.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  clearable: PropTypes.bool,
  arrowClassName: PropTypes.string,
};

WidgetSelect.defaultProps = {
  value: null,
  options: undefined,
  disabled: false,
  readOnly: false,
  clearable: null,
  arrowClassName: '',
  processing: false,
};

export default WidgetSelect;
