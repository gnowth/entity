import _omit from 'lodash/fp/omit';

// TODO remove defaultValue
export const filterProps = props => _omit([
  'defaultValue',
  'willChangeRecord',

  'initialValue',
  'mapProps',
  'onInputChange',
  'processing',
  'processingDidFail',
])(props);
