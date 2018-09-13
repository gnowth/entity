import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, withTheme } from 'styled-components';

import { PropTypesEntity } from 'lib/entity';

import { Provider } from './components/base';

const App = ({ routes: Routes, ...props }) => (
  <Provider
    value={{
      entity: props.entity,
    }}
  >
    <ThemeProvider theme={props.theme}>
      <Routes />
    </ThemeProvider>
  </Provider>
);

App.propTypes = {
  routes: PropTypes.func.isRequired,
  entity: PropTypesEntity.entity.isRequired,
  theme: PropTypes.shape({}),
};

App.defaultProps = {
  theme: {},
};

// TODO need to rename theme from withTheme to defaultTheme
export default withTheme(App);
