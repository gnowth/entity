import _isFunction from 'lodash/isFunction';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import React from 'react';
import { DefaultProvider } from '@gnowth/default';

import { AppConsumer } from './context';

// TODO to enable rerender for locale change, set key to locale.
// TODO read more about intl, about addLocalData?
const App = props => (
  <AppConsumer>
    { (context) => {
      if (process.env.NODE_ENV !== 'production') {
        if (props.intlProviderProps && !context.intlProvider) throw new Error('entity-app (App): intlProvider is required in "AppRoot"');
        if (props.themeProviderProps && !context.themeProvider) throw new Error('entity-app (App): themeProvider is required in "AppRoot"');
      }

      const IntlProvider = (props.intlProviderProps && context.intlProvider) || React.Fragment;
      const ThemeProvider = (props.themeProviderProps && context.themeProvider) || React.Fragment;

      const getProps = name => (
        _isFunction(props[name])
          ? props[name](context[name])
          : props[name]
      ) || {};

      // TODO merge root props for theme and intl? and check for default
      return (
        <DefaultProvider {...Object.assign({}, context.defaults, props.defaults)}>
          <IntlProvider {...getProps('intlProviderProps')}>
            <ThemeProvider {...getProps('themeProviderProps')}>
              { props.children }
            </ThemeProvider>
          </IntlProvider>
        </DefaultProvider>
      );
    }}
  </AppConsumer>
);

App.propTypes = exact({
  children: PropTypes.node.isRequired,

  defaults: PropTypes.shape({}),

  intlProviderProps: PropTypes.exact({
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  }),

  themeProviderProps: PropTypes.exact({
    theme: PropTypes.shape({}).isRequired,
  }),
});

App.defaultProps = {
  defaults: undefined,
  intlProviderProps: undefined,
  themeProviderProps: undefined,
};

export default App;
