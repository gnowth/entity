import React from 'react';
import PropTypes from 'prop-types';

class Value extends React.Component {
  state = {
    value: this.props.initialValue,
  };

  render() {
    return this.props.children(
      this.state.value,
      ({ target }) => this.setState({ value: target.value }),
    );
  }
}

Value.propTypes = {
  initialValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.func.isRequired,
};

Value.defaultProps = {
  initialValue: null,
};

export default Value;
