import _ from 'lodash';
import React from 'react';
import { css, ThemeContext } from 'styled-components';

import { component } from './selectors';
import cleanProps from './use-clean-props';

const defaultHook = (hook, ...args) => hook(...args);

const defaultTransient = [
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'media',
  'mediaPrintDisabled',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'palette',
  'paletteAsBackground',
  'paletteWeight',
];

export default function (_props, configs = {}) {
  const theme = React.useContext(ThemeContext) || {};
  const componentTheme = component(configs)({ theme, ..._props }) || {};

  const props = {
    ...componentTheme,

    theme,

    ..._.omitBy(_props, _.isUndefined),

    css: css`${componentTheme.css} ${_props.css}`,

    hooks: _.mapValues(
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

    styles: _.mergeWith(
      {},
      configs.styles,
      componentTheme.styles,
      _props.styles,
      (obj, src) => css`${obj} ${src}`,
    ),
  };

  const transient = _.isFunction(configs.transient)
    ? configs.transient(defaultTransient)
    : defaultTransient.concat(configs.transient || []);

  transient.forEach((key) => {
    props[`$${key}`] = props[key];
    delete props[key];
  });

  return configs.clean ? cleanProps(props) : props;
}
