import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { DefaultProvider } from '@burnsred/default';

import { AppProvider } from './context';

function AppRoot(props) {
  const IntlProvider = props.intlProvider || React.Fragment;
  const ThemeProvider = props.themeProvider || React.Fragment;

  return (
    <AppProvider {...props}>
      <IntlProvider {...props.intlProviderProps}>
        <ThemeProvider {...props.themeProviderProps}>
          <DefaultProvider {...props.defaults}>
            { props.children }
          </DefaultProvider>
        </ThemeProvider>
      </IntlProvider>
    </AppProvider>
  );
}

AppRoot.propTypes = exact({
  authEntity: PropTypesEntity.entity,
  children: PropTypes.node.isRequired,
  defaults: PropTypes.shape({}),
  entity: PropTypesEntity.entity.isRequired,
  intlProvider: PropTypesPlus.isRequiredIf('intlProviderProps', PropTypesPlus.component),
  intlProviderProps: PropTypes.exact({
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  }),
  themeProvider: PropTypesPlus.isRequiredIf('themeProviderProps', PropTypesPlus.component),
  themeProviderProps: PropTypes.exact({
    theme: PropTypes.shape({}).isRequired,
  }),
});

AppRoot.defaultProps = {
  authEntity: undefined,
  defaults: {},
  intlProvider: undefined,
  intlProviderProps: undefined,
  themeProvider: undefined,
  themeProviderProps: undefined,
};

export default React.memo(AppRoot);
