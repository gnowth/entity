import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import DatePicker from 'react-datepicker';

class WidgetDate extends React.Component {
  handleChange = value => this.props.onChange({
    target: {
      value,
      name: this.props.name,
    },
  })

  render() {
    return (
      <DatePicker
        onChange={this.handleChange}
        selected={this.props.value}
      />
    );
  }
}

WidgetDate.propTypes = {
  name: PropTypesPlus.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape(), // TODO find the right proptypes
};

WidgetDate.defaultProps = {
  value: null,
};

export default WidgetDate;
