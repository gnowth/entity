import _isString from 'lodash/isString';
import queryString from 'query-string';
import { Map } from 'immutable';

import Entity from './entity';
import EntityLocale from './entity-locale';

import BooleanField from '../field/field-boolean';
import CharField from '../field/field-char';
import EntityField from '../field/field-entity';
import IdField from '../field/field-id';
import IntegerField from '../field/field-integer';
import TextField from '../field/field-text';

export default class Title extends Entity {
  static fields = {
    description: new TextField({ blank: true }),
    is_archived: new BooleanField({ default: false }),
    locale: new EntityField({
      blank: true,
      entity: EntityLocale,
    }),
    order: new IntegerField({ mock: 'index' }),
    title: new CharField({ mock: 'lorem.sentence' }),
    title_short: new CharField({ blank: true }),
    uuid: new IdField({ blank: true, mock: 'random.uuid' }),
  }

  static paths = {
    urlBase: '',
  }

  static actionArchive(record, configs = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.duck?.actions?.save) throw new Error(`EntityTitle.actionArchive (${this.name}): "save" action is required in duck`);
    }

    return this.duck.actions.save(record, {
      action: 'archive',
      method: 'post',
      ...configs,
    });
  }

  static actionArrayDeleteAtIndexOrdered(records, configs) {
    return this.actionArrayDeleteAtIndex(records, configs)
      .map((record, i) => record.set('order', i));
  }

  static actionArrayMoveAtIndexOrdered(records, configs) {
    return this.actionArrayMoveAtIndex(records, configs)
      .map((record, i) => record.set('order', i));
  }

  static actionSave(record, configs = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.duck?.actions?.save) throw new Error(`EntityTitle.actionSave (${this.name}): "save" action is required in duck`);
    }

    return this.duck.actions.save(record, {
      invalidateList: true,
      ...configs,
    });
  }

  static toLink(record, configs = {}) {
    const computedParams = (configs.params || Map())
      .filterNot(param => param === undefined);

    const path = this.getPaths(configs)?.urlBase;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^\/.*\/$/.test(path)) throw new Error(`EntityTitle.toLink (${this.name}): "urlBase" property must start with a "/" and end with a "/"`);
      if (computedParams.some(value => !_isString(value))) throw new Error(`EntityTitle.toLink (${this.name}): every params must be a string or undefined`);
    }

    return `${path}${this.getId(record, configs)}/?${queryString.stringify(computedParams.toJS())}`;
  }

  static toString(record) {
    return record?.get('title') || '';
  }

  static toStringOrdered(record) {
    return record
      ? `${record.get('order') + 1}. ${this.toString(record)}`
      : '';
  }

  static toUrl(record, configs = {}) {
    const computedParams = (configs.params || Map())
      .remove('page')
      .remove('page_size')
      .filterNot(param => param === undefined);

    const path = this.getPaths(configs)?.urlBase;

    if (process.env.NODE_ENV !== 'production') {
      if (!/^\/.*\/$/.test(path)) throw new Error(`EntityTitle.toUrl (${this.name}): "urlBase" property must start with a "/" and end with a "/"`);
      if (computedParams.some(param => !_isString(param))) throw new Error(`EntityTitle.toUrl (${this.name}): every params must be a string or undefined`);
      if (!configs.settings?.BASE_URL) throw new Error(`EntityTitle.toUrl (${this.name}): "settings.BASE_URL" must be set.`);
    }

    return `${configs.settings.BASE_URL}${path}${this.getId(record, configs)}/?${queryString.stringify(computedParams.toJS())}`;
  }

  static toUrlExport(configs = {}) {
    const computedParams = configs.params
      ? configs.params
        .remove('page')
        .remove('page_size')
        .filterNot(param => param === undefined)
      : Map();

    const path = this.getPaths(configs)?.apiBase;

    if (process.env.NODE_ENV !== 'production') {
      if (!/^\/.*\/$/.test(path)) throw new Error(`EntityTitle.toUrlExport (${this.name}): "apiBase" property must start with a "/" and end with a "/"`);
      if (computedParams.some(param => !_isString(param))) throw new Error(`EntityTitle.toUrlExport (${this.name}): every params must be a string or undefined`);
      if (!configs.settings?.BASE_API_URL) throw new Error(`EntityTitle.toUrlExport (${this.name}): "settings.BASE_API_URL" must be set.`);
    }

    return `${configs.settings.BASE_API_URL}${path}?${queryString.stringify(computedParams.toJS())}&format=xlsx`;
  }
}
