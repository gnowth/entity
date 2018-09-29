import React from 'react';

// eslint-disable-next-line react/forbid-foreign-prop-types
export default ({ displayName, propTypes, defaultProps } = {}) => (Component) => {
  const withPropTypes = props => <Component {...props} />;

  withPropTypes.propTypes = propTypes;
  withPropTypes.defaultProps = defaultProps;
  withPropTypes.displayName = `withPropTypes-${displayName}`;

  return withPropTypes;
};

// function withSubscription(WrappedComponent) {
//   class WithSubscription extends React.Component {/* ... */ }
//   WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
//   return WithSubscription;
// }

// function getDisplayName(WrappedComponent) {
//   return WrappedComponent.displayName || WrappedComponent.name || 'Component';
// }

// check for forwarded ref
