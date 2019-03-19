import PropTypes from 'prop-types';
import React from 'react';

export const Context = React.createContext({});

export const AppConsumer = Context.Consumer;

export const AppProvider = ({ children, ...props }) => (
  <Context.Provider value={props}>
    { children }
  </Context.Provider>
);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
