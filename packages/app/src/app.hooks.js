import _isFunction from 'lodash/isFunction';
import React from 'react';
import { DefaultProvider } from '@gnowth/default';

export default {
  useComponents(props, context) {
    return {
      DefaultProvider: props.defaults ? DefaultProvider : React.Fragment,
      IntlProvider: (props.intlProviderProps && context.intlProvider) || React.Fragment,
      ThemeProvider: (props.themeProviderProps && context.themeProvider) || React.Fragment,
    };
  },

  usePropsDefault(props, context, provider) {
    const defaults = React.useMemo(
      () => (
        _isFunction(props.defaults)
          ? props.defaults(context.defaults)
          : { ...context.defaults, ...props.defaults }
      ),
      [context.defaults, props.defaults],
    );

    return provider === React.Fragment
      ? undefined
      : defaults;
  },

  usePropsIntl(props, context, provider) {
    const intlProviderProps = React.useMemo(
      () => (
        _isFunction(props.intlProviderProps)
          ? props.intlProviderProps(context.intlProviderProps)
          : {
            ...context.intlProviderProps,
            ...props.intlProviderProps,
            defaultFormats: {
              ...context.intlProviderProps?.defaultFormats,
              ...props.intlProviderProps?.defaultFormats,
            },
            formats: {
              ...context.intlProviderProps?.formats,
              ...props.intlProviderProps?.formats,
            },
            messages: {
              ...context.intlProviderProps?.messages,
              ...props.intlProviderProps?.messages,
            },
          }
      ),
      [context.intlProviderProps, props.intlProviderProps],
    );

    return provider === React.Fragment
      ? undefined
      : intlProviderProps;
  },

  usePropsTheme(props, context, provider) {
    const theme = React.useMemo(
      () => (
        _isFunction(props.themeProviderProps)
          ? props.themeProviderProps(context.themeProviderProps)
          : { ...context.themeProviderProps, ...props.themeProviderProps }
      ),
      [context.themeProviderProps, props.themeProviderProps],
    );

    return provider === React.Fragment
      ? undefined
      : theme;
  },
};
