import moment from 'moment';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

import { DatePicker, Wrapper } from './styles';

class WidgetDate extends React.Component {
  handleChange = value => this.props.onChange({
    target: {
      value,
      name: this.props.name,
    },
  })

  render() {
    return (
      <Wrapper
        className={this.props.className}
        css={this.props.css}
      >
        <DatePicker
          onChange={this.handleChange}
          selected={this.props.value}
        />
      </Wrapper>
    );
  }
}

WidgetDate.propTypes = {
  css: PropTypesPlus.css,
  name: PropTypesPlus.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(moment),
};

WidgetDate.defaultProps = {
  css: undefined,
  value: null,
};

export default WidgetDate;
