import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import React from 'react';

export const { Provider, Consumer } = React.createContext({});

export const { Provider: ArrayProvider, Consumer: ArrayConsumer } = React.createContext({});

export const { Provider: DefaultProvider, Consumer: FormConsumer } = React.createContext({});

export const FormProvider = props => (
  <DefaultProvider
    value={{
      defaultComponents: props.defaultComponents,
      defaultWidgets: props.defaultWidgets,
    }}
  >
    { props.children }
  </DefaultProvider>
);

FormProvider.propTypes = exact({
  children: PropTypes.node.isRequired,
  defaultComponents: PropTypes.shape({}),
  defaultWidgets: PropTypes.shape({}),
});

FormProvider.defaultProps = {
  defaultComponents: {},
  defaultWidgets: {},
};
