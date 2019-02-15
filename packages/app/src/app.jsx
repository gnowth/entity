import PropTypes from 'prop-types';
import React from 'react';

import { Context } from './context';
import defaultHooks from './app.hooks';

function App(props) {
  const hooks = { ...defaultHooks, ...props.hooks };
  const context = React.useContext(Context);
  const { DefaultProvider, IntlProvider, ThemeProvider } = hooks.useComponents(props, context);

  return (
    <IntlProvider {...hooks.usePropsIntl(props, context, IntlProvider)}>
      <ThemeProvider {...hooks.usePropsTheme(props, context, ThemeProvider)}>
        <DefaultProvider {...hooks.usePropsDefault(props, context, DefaultProvider)}>
          { props.children }
        </DefaultProvider>
      </ThemeProvider>
    </IntlProvider>
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
