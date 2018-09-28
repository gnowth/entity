import _isFunction from 'lodash/isFunction';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import React from 'react';

import { AppConsumer } from './context';

const App = props => (
  <AppConsumer>
    { (context) => {
      if (process.env.NODE_ENV !== 'production') {
        if (props.duckProviderProps && !context.duckProvider) throw new Error('entity-app (App): duckProvider is required in "AppRoot"');
        if (props.formProviderProps && !context.formProvider) throw new Error('entity-app (App): duckProvider is required in "AppRoot"');
        if (props.intlProviderProps && !context.intlProvider) throw new Error('entity-app (App): duckProvider is required in "AppRoot"');
        if (props.themeProviderProps && !context.themeProvider) throw new Error('entity-app (App): duckProvider is required in "AppRoot"');
      }

      const DuckProvider = (props.duckProviderProps && context.duckProvider) || React.Fragment;
      const FormProvider = (props.formProviderProps && context.formProvider) || React.Fragment;
      const IntlProvider = (props.intlProviderProps && context.intlProvider) || React.Fragment;
      const ThemeProvider = (props.themeProviderProps && context.themeProvider) || React.Fragment;

      const getProps = name => (
        _isFunction(props[name])
          ? props[name](context[name])
          : props[name]
      ) || {};

      return (
        <DuckProvider {...getProps('duckProviderProps')}>
          <FormProvider {...getProps('formProviderProps')}>
            <IntlProvider {...getProps('intlProviderProps')}>
              <ThemeProvider {...getProps('themeProviderProps')}>
                { props.children }
              </ThemeProvider>
            </IntlProvider>
          </FormProvider>
        </DuckProvider>
      );
    }}
  </AppConsumer>
);

App.propTypes = exact({
  children: PropTypes.node.isRequired,

  duckProviderProps: PropTypes.exact({
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
    }).isRequired,
  }),

  formProviderProps: PropTypes.exact({
    defaultComponents: PropTypes.object,
    defaultWidgets: PropTypes.object,
  }),

  intlProviderProps: PropTypes.exact({
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  }),

  themeProviderProps: PropTypes.exact({
    theme: PropTypes.shape({}).isRequired,
  }),
});

App.defaultProps = {
  duckProviderProps: undefined,
  formProviderProps: undefined,
  intlProviderProps: undefined,
  themeProviderProps: undefined,
};

export default App;
