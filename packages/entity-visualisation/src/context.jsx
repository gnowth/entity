import PropTypes from 'prop-types';
import React from 'react';

export const VisualisationContext = React.createContext({});

export const VisualisationConsumer = VisualisationContext.Consumer;

export const VisualisationProvider = ({ children, ...props }) => (
  <VisualisationContext.Provider value={props}>
    { children }
  </VisualisationContext.Provider>
);

VisualisationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const withVisualisationConsumer = Component => props => (
  <VisualisationContext.Consumer>
    { context => (
      <Component {...context} {...props} />
    )}
  </VisualisationContext.Consumer>
);
