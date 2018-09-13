import React from 'react';
import PropTypesImmutable from 'react-immutable-proptypes';

class ValueFromState extends React.Component {
  state = {
    value: this.props.initialValue,
  };

  render() {
    return (
      <this.props.component
        value={this.state.value}
        onChange={({ target }) => this.setState({ value: target.value })}
      />
    );
  }
}

ValueFromState.propTypes = {
  initialValue: PropTypesImmutable.map,
};

ValueFromState.defaultProps = {
  initialValue: null,
};

export default ValueFromState;
