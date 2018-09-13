// @flow

import parser from 'lib/parsers-error-drf';

import createGetEpic from './get';
import createListEpic from './list';
import createOptionsEpic from './options';
import createSaveEpic from './save';

export type EpicEntityOptions = { parser: Function };

export default (options: EpicEntityOptions = { parser }) => ({
  get: createGetEpic(options),
  list: createListEpic(options),
  options: createOptionsEpic(options),
  save: createSaveEpic(options),
});
