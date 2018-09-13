import React from 'react';
import PropTypes from 'prop-types';

export default function ({ renameHandleChangeToSetState = 'handleChangeToSetState', renameSetState = 'setState' } = {}) {
  return ComposedComponent => class withHandleChangeToSetState extends React.Component {
    static propTypes = {
      [renameSetState]: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ target }) {
      return this.props[renameSetState](
        target.name ? ({ [target.name]: target.value }) : target.value,
      );
    }

    render() {
      const props = Object.assign({}, this.props, {
        [renameHandleChangeToSetState]: this.handleChange,
      });

      return <ComposedComponent {...props} />;
    }
  };
}
