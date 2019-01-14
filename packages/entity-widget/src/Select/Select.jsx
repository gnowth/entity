import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';
import Select from 'react-select';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

class WidgetSelect extends React.Component {
  getOptions = createSelector(
    x => x,
    options => (options ? options.toJS() : []),
  )

  getValue = createSelector(
    x => x,
    value => (value && value.toJS ? value.toJS() : value),
  )

  getOptionLabel = option => this.props.field.toString(fromJS(option))

  getOptionValue = option => this.props.field.toString(fromJS(option))

  handleChange = value => this.props.onChange({
    target: {
      index: this.props.index,
      name: this.props.name,
      value: fromJS(value),
    },
  })

  render() {
    return (
      <Select
        {...this.props}
        getOptionLabel={this.props.getOptionLabel || this.getOptionLabel}
        getOptionValue={this.props.getOptionValue || this.getOptionValue}
        isClearable={!this.props.field.blank}
        isLoading={this.props.processing}
        isMulti={this.props.field.many}
        onChange={this.handleChange}
        options={this.getOptions(this.props.options)}
        styles={Object.assign({}, this.props.theme.components?.widgetSelect?.styles, this.props.styles)}
        value={this.getValue(this.props.value)}
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
  options: undefined,
  processing: false,
  styles: {},
  theme: {},
  value: undefined,
};

export default styled(WidgetSelect)`
  ${props => props.theme.components?.widgetSelect?.[props.variant || 'main']?.css}
  ${props => props.css}
`;
