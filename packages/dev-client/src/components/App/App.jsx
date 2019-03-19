import standardTheme from '@gnowth/theme-standard';
import PropTypes from 'prop-types';
import React from 'react';
import { EntityTitle } from '@entity/core';
import { AppRoot } from '@gnowth/app';
import { GlobalStyles } from '@gnowth/theme';
import { Provider } from 'react-redux';
import { IntlProvider } from '@private/react-intl';
import { ThemeProvider } from 'styled-components';

import * as theme from 'styles';

import defaults from '../../defaults';

const App = props => (
  <AppRoot
    defaults={defaults}
    entity={EntityTitle}
    intlProvider={IntlProvider}
    intlProviderProps={{ locale: 'en', messages: {} }}
    themeProvider={ThemeProvider}
    themeProviderProps={{ theme: { ...standardTheme, ...theme } }}
    {...props}
  >
    <Provider store={defaults.store}>
      { props.children }
    </Provider>

    <GlobalStyles />
  </AppRoot>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(App);
