import _ from 'lodash';

const defaultLocal = [
  'locales',
  'names',
  'namespace',
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
  const local = _.isFunction(configs.local)
    ? configs.local(defaultLocal)
    : defaultLocal.concat(configs.local || []);

  return _.flowRight([
    obj => _.omitBy(obj, _.isUndefined),
    obj => _.omit(obj, local),
  ])(props);
}
