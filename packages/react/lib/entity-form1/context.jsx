import PropTypes from 'prop-types';
import React from 'react';

import PropTypesPlus from 'lib/prop-types/Plus';

export const { Provider: FormProvider, Consumer: FormConsumer } = React.createContext({});

export const { Provider: DefaultProvider, Consumer: FormDefaultConsumer } = React.createContext({
  defaultComponents: {},
  defaultWidgets: {},
});

// TODO:REMOVE if not being used
export const withForm = ComposedComponent => function withFormConsumer(props) {
  return (
    <FormConsumer>
      { context => <ComposedComponent {...context} {...props} /> }
    </FormConsumer>
  );
};

// TODO:REMOVE if not being used
export const withFormDefault = ComposedComponent => function withFormDefaultConsumer(props) {
  return (
    <FormDefaultConsumer>
      { context => <ComposedComponent {...context} {...props} /> }
    </FormDefaultConsumer>
  );
};

// TODO:OPTIMISE props is being generated and it will rerender all the time when children changes
export const FormDefaultProvider = ({ children, ...props }) => (
  <DefaultProvider value={props}>
    { children }
  </DefaultProvider>
);

FormDefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultComponents: PropTypes.shape({
    label: PropTypesPlus.component,
    query: PropTypesPlus.component,
  }),
  defaultWidgets: PropTypes.objectOf(PropTypesPlus.component.isRequired),
};

FormDefaultProvider.defaultProps = {
  defaultComponents: {},
  defaultWidgets: {},
};
