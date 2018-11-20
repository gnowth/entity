import PropTypes from 'prop-types';
import React from 'react';

const { Provider, Consumer } = React.createContext({});

export const AppConsumer = Consumer;

export const AppProvider = ({ children, ...props }) => (
  <Provider value={props}>
    { children }
  </Provider>
);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
