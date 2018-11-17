import _isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { DefaultProvider } from '@gnowth/default';

import { AppConsumer } from './context';

const App = props => (
  <AppConsumer>
    { (context) => {
      if (process.env.NODE_ENV !== 'production') {
        if (props.intlProviderProps && !context.intlProvider) throw new Error('entity-app (App): intlProvider is required in "AppRoot"');
        if (props.themeProviderProps && !context.themeProvider) throw new Error('entity-app (App): themeProvider is required in "AppRoot"');
      }

      const IntlProvider = (props.intlProviderProps && context.intlProvider) || React.Fragment;
      const ThemeProvider = (props.themeProviderProps && context.themeProvider) || React.Fragment;
      const Container = props.containerComponent || React.Fragment;

      const getProps = name => (
        _isFunction(props[name])
          ? props[name](context[name])
          : props[name]
      ) || {};

      return (
        <DefaultProvider {...Object.assign({}, context.defaults, props.defaults)}>
          <IntlProvider {...getProps('intlProviderProps')}>
            <ThemeProvider {...getProps('themeProviderProps')}>
              <Container {...(props.containerComponentProps || {})}>
                { props.children }
              </Container>
            </ThemeProvider>
          </IntlProvider>
        </DefaultProvider>
      );
    }}
  </AppConsumer>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
  containerComponent: PropTypesPlus.isRequiredIf('containerComponentProps', PropTypesPlus.component),
  containerComponentProps: PropTypes.shape({}),
  defaults: PropTypes.shape({}),
  intlProviderProps: PropTypes.exact({
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  }),
  themeProviderProps: PropTypes.exact({
    theme: PropTypes.shape({}).isRequired,
  }),
};

App.defaultProps = {
  containerComponent: undefined,
  containerComponentProps: undefined,
  defaults: undefined,
  intlProviderProps: undefined,
  themeProviderProps: undefined,
};

export default App;
