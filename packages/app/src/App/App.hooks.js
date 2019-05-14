import _ from 'lodash';
import idx from 'idx';
import React from 'react';
import { DefaultProvider } from '@burnsred/default';

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
        _.isFunction(props.defaults)
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
        _.isFunction(props.intlProviderProps)
          ? props.intlProviderProps(context.intlProviderProps)
          : {
            ...context.intlProviderProps,
            ...props.intlProviderProps,
            defaultFormats: {
              ...idx(context, x => x.intlProviderProps.defaultFormats),
              ...idx(props, x => x.intlProviderProps.defaultFormats),
            },
            formats: {
              ...idx(context, x => x.intlProviderProps.formats),
              ...idx(props, x => x.intlProviderProps.formats),
            },
            messages: {
              ...idx(context, x => x.intlProviderProps.messages),
              ...idx(props, x => x.intlProviderProps.messages),
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
        _.isFunction(props.themeProviderProps)
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
