import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';
import Select from 'react-select';
import { component } from '@burnsred/theme';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

class WidgetSelect extends React.Component {
  selectOptions = createSelector(
    x => x,
    options => (options ? options.toJS() : []),
  )

  selectValue = createSelector(
    x => x,
    value => (value && value.toJS ? value.toJS() : value),
  )

  handleChange = value => this.props.onChange({
    target: {
      index: this.props.index,
      name: this.props.name,
      value: fromJS(value),
    },
  })

  handleGetOptionLabel = option => this.props.field.toString(fromJS(option))

  handleGetOptionValue = option => this.props.field.toString(fromJS(option))

  render() {
    return (
      <Select
        {...this.props}
        getOptionLabel={this.props.getOptionLabel || this.handleGetOptionLabel}
        getOptionValue={this.props.getOptionValue || this.handleGetOptionValue}
        isClearable={this.props.field.blank}
        isLoading={this.props.processing}
        isMulti={this.props.field.many}
        onChange={this.handleChange}
        onInputChange={this.props.onChangeInput}
        options={this.selectOptions(this.props.options)}
        styles={Object.assign({}, component({ namespace: 'component_widgetSelect', branch: 'styles' })(this.props), this.props.styles)}
        value={this.selectValue(this.props.value)}
      />
    );
  }
}

WidgetSelect.propTypes = {
  field: PropTypesEntity.field.isRequired,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func,
  options: PropTypesImmutable.list,
  processing: PropTypes.bool,
  styles: PropTypes.shape({}),
  theme: PropTypes.shape({
    components: PropTypes.shape({
      widgetSelect: PropTypes.shape({
        styles: PropTypes.shape({}),
      }),
    }),
  }),
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

WidgetSelect.defaultProps = {
  getOptionLabel: undefined,
  getOptionValue: undefined,
  index: undefined,
  onChangeInput: undefined,
  options: undefined,
  processing: false,
  styles: {},
  theme: {},
  value: undefined,
};

export default styled(WidgetSelect)`
  ${component({ namespace: 'component_widgetSelect', branch: 'root' })}
  ${props => props.css}
`;
