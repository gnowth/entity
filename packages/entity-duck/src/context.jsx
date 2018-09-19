import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-lus';
import React from 'react';

export const { Provider, Consumer: DuckConsumer } = React.createContext({});

export const DuckProvider = ({ children, ...props }) => (
  <Provider value={props}>
    { children }
  </Provider>
);

DuckProvider.propTypes = exact({
  children: PropTypes.node.isRequired,
  processingComponent: PropTypesPlus.isRequiredIf('processingComponentProps', PropTypesPlus.component),
  processingComponentProps: PropTypes.shape({}),
  processingDidFailComponent: PropTypesPlus.isRequiredIf('processingDidFailComponentProps', PropTypesPlus.component),
  processingDidFailComponentProps: PropTypes.shape({}),
  recordsCountComponent: PropTypesPlus.isRequiredIf('recordsCountComponentProps', PropTypesPlus.component),
  recordsCountComponentProps: PropTypes.shape({}),
  recordsCountNoneComponent: PropTypesPlus.isRequiredIf('recordsCountNoneComponentProps', PropTypesPlus.component),
  recordsCountNoneComponentProps: PropTypes.shape({}),
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
});

DuckProvider.defaultProps = {
  processingComponent: undefined,
  processingComponentProps: undefined,
  processingDidFailComponent: undefined,
  processingDidFailComponentProps: undefined,
  recordsCountComponent: undefined,
  recordsCountComponentProps: undefined,
  recordsCountNoneComponent: undefined,
  recordsCountNoneComponentProps: undefined,
};

export const withDuck = Component => function DuckedComponent(props) {
  return (
    <DuckConsumer>
      { context => <Component {...context} {...props} /> }
    </DuckConsumer>
  );
};
