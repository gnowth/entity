import _flowRight from 'lodash/flowRight';
import _omit from 'lodash/omit';
import _omitBy from 'lodash/omitBy';
import React from 'react';

export const filterProps = props => _flowRight(
  modifiedProps => _omitBy(modifiedProps, p => p === undefined),
  modifiedProps => _omit(modifiedProps, [
    'field',
    'inputValue',
    'mapProps',
    'onInputChange',
    'options',
    'processing',
    'processingDidFail',
    'valueInitial',
    'willChangeRecord',
  ]),
)(props);

export default ComposedComponent => function withPropsFiltered(props) {
  return <ComposedComponent {...filterProps(props)} />;
};
