import _omit from 'lodash/fp/omit';
import React from 'react';

const filterProps = _omit([
  'defaultValue',
  'willChangeRecord',

  'initialValue',
  'mapProps',
  'onInputChange',
  'processing',
  'processingDidFail',
]);

export default ComposedComponent => function withPropsFiltered(props) {
  return <ComposedComponent {...filterProps(props)} />;
};
