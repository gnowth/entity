import _isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React from 'react';
import { DefaultProvider } from '@gnowth/default';

import { AppConsumer } from './context';

class App extends React.PureComponent {
  getPropsIntl(context) {
    if (!context.intlProvider) return {};

    return _isFunction(this.props.intlProviderProps)
      ? this.props.intlProviderProps(context.intlProviderProps)
      : {
        ...context.intlProviderProps,
        ...this.props.intlProviderProps,
        messages: Object.assign(
          {},
          context.intlProviderProps.messages,
          this.props.intlProviderProps.messages,
        ),
      };
  }

  getPropsTheme(context) {
    if (!context.themeProvider) return {};

    const computedThemeProviderProps = _isFunction(this.props.themeProviderProps)
      ? this.props.themeProviderProps(context.themeProviderProps)
      : this.props.themeProviderProps;

    return computedThemeProviderProps;
  }

  renderContext = (context) => {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.intlProviderProps && !context.intlProvider) throw new Error('App.renderContext: intlProvider is required in "AppRoot"');
      if (this.props.themeProviderProps && !context.themeProvider) throw new Error('App.renderContext: themeProvider is required in "AppRoot"');
    }

    const IntlProvider = (this.props.intlProviderProps && context.intlProvider) || React.Fragment;
    const ThemeProvider = (this.props.themeProviderProps && context.themeProvider) || React.Fragment;

    return (
      <DefaultProvider {...context.defaults} {...this.props.defaults}>
        <IntlProvider {...this.getPropsIntl(context)}>
          <ThemeProvider {...this.getPropsTheme(context)}>
            { this.props.children }
          </ThemeProvider>
        </IntlProvider>
      </DefaultProvider>
    );
  }

  render() {
    return <AppConsumer>{ this.renderContext }</AppConsumer>;
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  defaults: PropTypes.shape({}),
  intlProviderProps: PropTypes.exact({
    locale: PropTypes.string,
    messages: PropTypes.objectOf(PropTypes.string),
  }),
  themeProviderProps: PropTypes.exact({
    theme: PropTypes.shape({}).isRequired,
  }),
};

App.defaultProps = {
  defaults: {},
  intlProviderProps: {},
  themeProviderProps: undefined,
};

export default App;
