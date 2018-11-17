import _omit from 'lodash/omit';
import React from 'react';

export const filterProps = props => _omit(props, [
  'defaultValue',
  'field',
  'initialValue',
  'inputValue',
  'mapProps',
  'onInputChange',
  'options',
  'processing',
  'processingDidFail',
  'willChangeRecord',
]);

export default ComposedComponent => function withPropsFiltered(props) {
  return <ComposedComponent {...filterProps(props)} />;
};
