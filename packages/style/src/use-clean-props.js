import _flowRight from 'lodash/flowRight';
import _isFunction from 'lodash/isFunction';
import _isUndefined from 'lodash/isUndefined';
import _omit from 'lodash/omit';
import _omitBy from 'lodash/omitBy';

const defaultLocal = [
  'hooks',
  'locales',
  'names',
  'namespace',
  'styles',
  'variant',

  'errors',
  'field',
  'inputValue',
  'onChangeInput',
  'onClose',
  'onSubmit',
  'options',
  'processing',
  'processingDidFail',
  'valueInitial',
];

export default function (props, configs = {}) {
  const local = _isFunction(configs.local)
    ? configs.local(defaultLocal)
    : defaultLocal.concat(configs.local || []);

  return _flowRight(
    obj => _omitBy(obj, _isUndefined),
    obj => _omit(obj, local),
  )(props);
}
