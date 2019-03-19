import PropTypes from 'prop-types';
import React from 'react';

import { AppProvider, Context } from '../context';
import defaultHooks from './App.hooks';

function App(props) {
  const hooks = { ...defaultHooks, ...props.hooks };
  const context = React.useContext(Context);
  const { DefaultProvider, IntlProvider, ThemeProvider } = hooks.useComponents(props, context);

  const nextContext = {
    ...context,
    defaults: hooks.usePropsDefault(props, context, DefaultProvider),
    intlProviderProps: hooks.usePropsIntl(props, context, IntlProvider),
    themeProviderProps: hooks.usePropsTheme(props, context, ThemeProvider),
  };

  return (
    <AppProvider {...nextContext}>
      <IntlProvider {...nextContext.intlProviderProps}>
        <ThemeProvider {...nextContext.themeProviderProps}>
          <DefaultProvider {...nextContext.defaults}>
            { props.children }
          </DefaultProvider>
        </ThemeProvider>
      </IntlProvider>
    </AppProvider>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  defaults: PropTypes.shape({}),
  hooks: PropTypes.exact({
    useComponents: PropTypes.func,
    usePropsDefault: PropTypes.func,
    usePropsIntl: PropTypes.func,
    usePropsTheme: PropTypes.func,
  }),
  intlProviderProps: PropTypes.exact({
    locale: PropTypes.string,
    messages: PropTypes.shape({}),
  }),
  themeProviderProps: PropTypes.exact({
    theme: PropTypes.shape({}),
  }),
};

App.defaultProps = {
  defaults: undefined,
  hooks: undefined,
  intlProviderProps: undefined,
  themeProviderProps: undefined,
};

export default React.memo(App);
