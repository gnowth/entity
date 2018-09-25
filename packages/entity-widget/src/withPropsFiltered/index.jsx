import _omit from 'lodash/fp/omit';
import React from 'react';

const filterProps = _omit([
  'defaultValue',
  'field',
  'initialValue',
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
