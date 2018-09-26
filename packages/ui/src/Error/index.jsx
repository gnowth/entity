import PropTypes from 'prop-types';
import React from 'react';

class UIError extends React.Component {
  state = {
    error: null,
  }

  componentDidCatch(error, info) {
    console.log('errorhee', error.toString());

    this.setState({ error });
  }

  render() {
    return this.state.error
      ? <div>{ this.state.error.toString() }</div>
      : this.props.children;
  }
}

UIError.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UIError;
