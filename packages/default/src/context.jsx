import PropTypes from 'prop-types';
import React from 'react';

export const DefaultContext = React.createContext({});

export const DefaultConsumer = DefaultContext.Consumer;

export const DefaultProvider = ({ children, ...props }) => (
  <DefaultContext.Provider value={props}>
    { children }
  </DefaultContext.Provider>
);

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
