import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';

import PropTypesEntity from 'lib/prop-types/Entity';
import PropTypesForm from 'lib/prop-types/Form';
import PropTypesPlus from 'lib/prop-types/Plus';

const { Provider, Consumer } = React.createContext({});

const { Provider: DefaultProvider, Consumer: DefaultConsumer } = React.createContext({
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


export const FormConsumer = Consumer;


// TODO:OPTIMISE? props is being generated and it will rerender all the time when children changes
export const FormProvider = ({ children, ...props }) => (
  <Provider value={props}>
    { children }
  </Provider>
);

FormProvider.propTypes = exact({
  children: PropTypes.node.isRequired,
  formDisabled: PropTypes.bool,
  formField: PropTypesEntity.field.isRequired,
  formIndex: PropTypes.number,
  formInitialValue: PropTypesImmutable.map,
  formName: PropTypesForm.name,
  formNameMapper: PropTypes.shape({}),
  formOnChange: PropTypes.func.isRequired,
  formReadOnly: PropTypes.bool,
  formValue: PropTypes.oneOfType([
    PropTypesImmutable.map,
    PropTypesImmutable.list,
  ]).isRequired,
});

FormProvider.defaultProps = {
  formDisabled: false,
  formIndex: undefined,
  formInitialValue: null,
  formName: undefined,
  formNameMapper: {},
  formReadOnly: false,
};


export const FormDefaultConsumer = DefaultConsumer;


// TODO:OPTIMISE? props is being generated and it will rerender all the time when children changes
export const FormDefaultProvider = ({ children, ...props }) => (
  <DefaultProvider value={props}>
    { children }
  </DefaultProvider>
);

FormDefaultProvider.propTypes = exact({
  children: PropTypes.node.isRequired,
  defaultComponents: PropTypes.shape({
    label: PropTypesPlus.component,
    query: PropTypesPlus.component,
  }),
  defaultWidgets: PropTypes.objectOf(PropTypesPlus.component.isRequired),
});

FormDefaultProvider.defaultProps = {
  defaultComponents: {},
  defaultWidgets: {},
};
