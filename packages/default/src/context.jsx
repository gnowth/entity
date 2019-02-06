import PropTypes from 'prop-types';
import React from 'react';

export const Context = React.createContext({});

export const DefaultConsumer = Context.Consumer;

export const DefaultProvider = ({ children, ...props }) => (
  <Context.Provider value={props}>
    { children }
  </Context.Provider>
);

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
