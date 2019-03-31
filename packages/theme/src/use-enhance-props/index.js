import _ from 'lodash';
import React from 'react';
import { css, ThemeContext } from 'styled-components';

import { component } from '../selectors';
import cleanProps from '../use-clean-props';
import utils from './use-enhance-props.utils';

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

export default function (_component, _props, configs = {}) {
  const theme = React.useContext(ThemeContext) || {};
  const componentProps = _.omitBy(_props, _.isUndefined);
  const themeProps = component(configs)({ theme, ...componentProps }) || {};

  const props = {
    ...themeProps,

    theme,

    ...componentProps,

    css: css`${themeProps.css} ${componentProps.css}`,

    ...utils.mergeProps(_component.mergeProps, themeProps, componentProps),
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
