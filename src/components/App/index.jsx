import PropTypes from 'prop-types';
import React from 'react';
import { AppRoot } from '@gnowth/app';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import * as theme from 'styles';
import GlobalStyles from 'styles/global';

import defaults from '../../defaults';

const App = props => (
  <AppRoot
    defaults={defaults}
    intlProvider={IntlProvider}
    intlProviderProps={{ locale: 'en', messages: {} }}
    themeProvider={ThemeProvider}
    themeProviderProps={{ theme }}
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

export default App;
