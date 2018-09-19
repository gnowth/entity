import React from 'react';
import _isFunction from 'lodash/fp/isFunction';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';

const _React$createContext = React.createContext({}),
      AppProvider = _React$createContext.Provider,
      AppConsumer = _React$createContext.Consumer;

const App = props => React.createElement(AppConsumer, null, context => {
  if (process.env.NODE_ENV !== 'production') {
    if (props.duckProviderProps && !context.duckProvider) throw new Error('entity-app (App): duckProvider is required in "AppRoot"');
    if (props.formProviderProps && !context.formProvider) throw new Error('entity-app (App): duckProvider is required in "AppRoot"');
    if (props.intlProviderProps && !context.intlProvider) throw new Error('entity-app (App): duckProvider is required in "AppRoot"');
    if (props.themeProviderProps && !context.themeProvider) throw new Error('entity-app (App): duckProvider is required in "AppRoot"');
  }

  const DuckProvider = props.duckProviderProps && context.duckProvider || React.Fragment;
  const FormProvider = props.formProviderProps && context.formProvider || React.Fragment;
  const IntlProvider = props.intlProviderProps && context.intlProvider || React.Fragment;
  const ThemeProvider = props.themeProviderProps && context.themeProvider || React.Fragment;

  const getProps = name => (_isFunction(props[name]) ? props[name](context[name]) : props[name]) || {};

  return React.createElement(DuckProvider, getProps('duckProviderProps'), React.createElement(FormProvider, getProps('formProviderProps'), React.createElement(IntlProvider, getProps('intlProviderProps'), React.createElement(ThemeProvider, getProps('themeProviderProps'), props.children))));
});

App.propTypes = exact({
  children: PropTypes.node.isRequired,
  duckProviderProps: PropTypes.exact({
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired
    }).isRequired
  }),
  formProviderProps: PropTypes.exact({
    defaultComponents: PropTypes.object,
    defaultWidgets: PropTypes.object
  }),
  intlProviderProps: PropTypes.exact({
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired
  }),
  themeProviderProps: PropTypes.exact({
    theme: PropTypes.shape({}).isRequired
  })
});
App.defaultProps = {
  duckProviderProps: undefined,
  formProviderProps: undefined,
  intlProviderProps: undefined,
  themeProviderProps: undefined
};

const AppRoot = props => {
  const DuckProvider = props.duckProvider || React.Fragment;
  const FormProvider = props.formProvider || React.Fragment;
  const IntlProvider = props.intlProvider || React.Fragment;
  const ThemeProvider = props.themeProvider || React.Fragment;
  return React.createElement(AppProvider, {
    value: props
  }, React.createElement(DuckProvider, props.duckProviderProps || {}, React.createElement(FormProvider, props.formProviderProps || {}, React.createElement(IntlProvider, props.intlProviderProps || {}, React.createElement(ThemeProvider, props.themeProviderProps || {}, props.children)))));
};

AppRoot.propTypes = exact({
  children: PropTypes.node.isRequired,
  duckProvider: PropTypesPlus.isRequiredIf('duckProviderProps', PropTypesPlus.provider),
  duckProviderProps: PropTypes.exact({
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
      subscribe: PropTypes.func.isRequired
    })
  }),
  formProvider: PropTypesPlus.isRequiredIf('formProviderProps', PropTypesPlus.provider),
  formProviderProps: PropTypes.exact({
    defaultComponents: PropTypes.object,
    defaultWidgets: PropTypes.object
  }),
  intlProvider: PropTypesPlus.isRequiredIf('intlProviderProps', PropTypesPlus.provider),
  intlProviderProps: PropTypes.exact({
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired
  }),
  themeProvider: PropTypesPlus.isRequiredIf('themeProviderProps', PropTypesPlus.provider),
  themeProviderProps: PropTypes.exact({
    theme: PropTypes.shape({}).isRequired
  })
});
AppRoot.defaultProps = {
  duckProvider: undefined,
  duckProviderProps: undefined,
  formProvider: undefined,
  formProviderProps: undefined,
  intlProvider: undefined,
  intlProviderProps: undefined,
  themeProvider: undefined,
  themeProviderProps: undefined
};

export { App, AppRoot, AppProvider, AppConsumer };
