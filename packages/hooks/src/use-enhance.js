import _isUndefined from 'lodash/isUndefined';
import _mapValues from 'lodash/mapValues';
import _mergeWith from 'lodash/mergeWith';
import _omitBy from 'lodash/omitBy';
import React from 'react';
import { css, ThemeContext } from 'styled-components';

const defaultHook = (hook, ...args) => hook(...args);

export default function (_props, configs = {}) {
  const theme = React.useContext(ThemeContext) || {};
  const componentTheme = theme[`${configs.namespace || _props.namespace}_${configs.variant || _props.variant}`] || {};

  const props = {
    ...componentTheme,

    ..._omitBy(_props, _isUndefined),

    css: css`${componentTheme.css} ${_props.css}`,

    hooks: _mapValues(
      configs.hooks,
      (hook, key) => (...args) => (_props.hooks?.[key] || defaultHook)(
        (...themeArgs) => (componentTheme.hooks?.[key] || defaultHook)(hook, ...themeArgs),
        ...args,
      ),
    ),

    locales: {
      ...configs.locales,
      ...componentTheme.locales,
      ..._props.locales,
    },

    names: {
      ...configs.names,
      ...componentTheme.names,
      ..._props.names,
    },

    styles: _mergeWith(
      {},
      configs.styles,
      componentTheme.styles,
      _props.styles,
      (obj, src) => css`${obj} ${src}`,
    ),
  };

  (configs.transient || []).forEach((key) => {
    props[`$${key}`] = props[key];
    delete props[key];
  });

  (configs.localProps || []).forEach((key) => {
    props[`$$${key}`] = props[key];
    delete props[key];
  });

  return props;
}
