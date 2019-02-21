import _isUndefined from 'lodash/isUndefined';
import _mapValues from 'lodash/mapValues';
import _mergeWith from 'lodash/mergeWith';
import _omitBy from 'lodash/omitBy';
import React from 'react';
import { ThemeContext } from 'styled-components';

const defaultHook = (hook, ...args) => hook(...args);

export default function (props, configs = {}) {
  const theme = React.useContext(ThemeContext);
  const componentTheme = theme[`${configs.namespace || props.namespace}_${configs.variant || props.variant}`] || {};

  return {
    ...configs,
    theme,
    ...componentTheme,
    ..._omitBy(props, _isUndefined),
    css: [].concat([componentTheme.css, props.css]),
    hooks: _mapValues(
      configs.hooks,
      (hook, key) => (...args) => (props.hooks?.[key] || defaultHook)(
        (...themeArgs) => (componentTheme.hooks?.[key] || defaultHook)(hook, ...themeArgs),
        ...args,
      ),
    ),
    locales: { ...configs.locales, ...componentTheme.locales, ...props.locales },
    names: { ...configs.names, ...componentTheme.names, ...props.names },
    styles: _mergeWith(
      {},
      [configs.styles, componentTheme.styles, props.styles],
      (obj, src) => (obj || []).concat(src || []),
    ),
  };
}
