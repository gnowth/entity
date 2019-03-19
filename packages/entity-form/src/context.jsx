import PropTypes from 'prop-types';
import React from 'react';

export const FormContext = React.createContext({});

export const FormConsumer = FormContext.Consumer;

export const FormProvider = ({ children, ...props }) => (
  <FormContext.Provider value={props}>
    { children }
  </FormContext.Provider>
);

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
