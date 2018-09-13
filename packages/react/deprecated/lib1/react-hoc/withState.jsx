import React from 'react';
import { Map } from 'immutable';

export default function ({ renameState = 'state', renameSetState = 'setState', initialState = Map() } = {}) {
  if (process.env.NODE_ENV !== 'production') {
    if (!Map.isMap(initialState)) {
      throw new Error('react-hoc(withState): initialState should be of immutable Map instance');
    }
  }

  return ComposedComponent => class withState extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: initialState };

      this.handleSetState = this.handleSetState.bind(this);
    }

    handleSetState({ target: { name, value } = {} } = {}) {
      this.setState(prevState => ({
        value: name
          ? prevState.value.set(name, value)
          : prevState.value.merge(value),
      }));
    }

    render() {
      const props = Object.assign({}, this.props, {
        [renameSetState]: this.handleSetState,
        [renameState]: this.state.value,
      });

      return <ComposedComponent {...props} />;
    }
  };
}
