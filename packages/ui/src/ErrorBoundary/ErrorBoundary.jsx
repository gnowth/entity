import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { List } from 'immutable';

import ErrorWell from '../ErrorWell';

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return {
      error,
      hasError: true,
    };
  }

  state = { hasError: false }

  componentDidCatch(error, info) {
    this.props.onError(error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const Fallback = this.props.fallbackComponent;

    return (
      <Fallback
        errors={List([this.state.error.message])}
        {...this.props.fallbackComponentProps}
      />
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackComponent: PropTypesPlus.component,
  fallbackComponentProps: PropTypes.shape({}),
  onError: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  fallbackComponent: ErrorWell,
  fallbackComponentProps: {},
  onError: () => undefined,
};

export default ErrorBoundary;
