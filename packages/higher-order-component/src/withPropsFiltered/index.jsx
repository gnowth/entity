import _ from 'lodash';
import React from 'react';

export const filterProps = props => _.flowRight(
  modifiedProps => _.omitBy(modifiedProps, p => p === undefined),
  modifiedProps => _.omit(modifiedProps, [
    'field',
    'inputValue',
    'mapProps',
    'onChangeInput',
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
