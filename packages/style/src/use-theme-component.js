import _isUndefined from 'lodash/isUndefined';
import _omitBy from 'lodash/omitBy';
import React from 'react';
import { ThemeContext } from 'styled-components';

import { component } from './selectors';

export default function (configs = {}, props = {}) {
  const theme = React.useContext(ThemeContext);
  const componentTheme = component(configs)({ ...props, theme });

  return {
    ...componentTheme,
    ..._omitBy(props, _isUndefined),
  };
}
