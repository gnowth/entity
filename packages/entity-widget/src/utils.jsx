import _omit from 'lodash/fp/omit';
import React from 'react';

export const filterProps = _omit([
  'defaultValue',
  'willChangeRecord',

  'initialValue',
  'mapProps',
  'onInputChange',
  'processing',
  'processingDidFail',
]);

export const withPropsFiltered = ComposedComponent => props => (
  <ComposedComponent {...filterProps(props)} />
);
