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

// TODO add name to component or find new name
export const withPropsFiltered = ComposedComponent => function withPropsFiltered(props) {
  return <ComposedComponent {...filterProps(props)} />;
};
