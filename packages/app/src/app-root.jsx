import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { DefaultProvider } from '@gnowth/default';

import { AppProvider } from './context';

const AppRoot = (props) => {
  const IntlProvider = props.intlProvider || React.Fragment;
  const ThemeProvider = props.themeProvider || React.Fragment;

  return (
    <AppProvider value={props}>
      <DefaultProvider {...props.defaults}>
        <IntlProvider {...(props.intlProviderProps || {})}>
          <ThemeProvider {...(props.themeProviderProps || {})}>
            { props.children }
          </ThemeProvider>
        </IntlProvider>
      </DefaultProvider>
    </AppProvider>
  );
};

AppRoot.propTypes = exact({
  children: PropTypes.node.isRequired,

  defaults: PropTypes.shape({}),

  intlProvider: PropTypesPlus.isRequiredIf('intlProviderProps', PropTypesPlus.provider),
  intlProviderProps: PropTypes.exact({
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  }),

  themeProvider: PropTypesPlus.isRequiredIf('themeProviderProps', PropTypesPlus.provider),
  themeProviderProps: PropTypes.exact({
    theme: PropTypes.shape({}).isRequired,
  }),
});

AppRoot.defaultProps = {
  defaults: {},
  intlProvider: undefined,
  intlProviderProps: undefined,
  themeProvider: undefined,
  themeProviderProps: undefined,
};

export default AppRoot;
