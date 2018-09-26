import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import React from 'react';
import Select from 'react-select';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

class WidgetSelect extends React.Component {
  getOptions = createSelector(
    x => x,
    options => (options ? options.toJS() : []),
  )

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
        isClearable={!this.props.field.blank}
        isLoading={this.props.processing}
        isMulti={this.props.field.many}
        onChange={this.handleChange}
        options={this.getOptions(this.props.options)}
      />
    );
  }
}

WidgetSelect.propTypes = {
  field: PropTypesEntity.field.isRequired,
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

WidgetSelect.defaultProps = {
  index: undefined,
};

export default styled(WidgetSelect)`
  ${props => props.theme.components?.widgetSelect}
  ${props => props.css}
`;
