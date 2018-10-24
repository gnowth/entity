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
  static urlBase = '';

  static fields = {
    description: new TextField(),
    is_archived: new BooleanField({ default: false }),
    locale: new EntityField({
      blank: true,
      entity: EntityLocale,
    }),
    order: new IntegerField(),
    title: new CharField(),
    title_short: new CharField({ blank: true }),
    uuid: new IdField({ blank: true }),
  }

  static actionArchive(record, options) {
    return this.duck?.save(record, Object.assign(
      { action: 'archive', method: 'post' },
      options,
    ));
  }

  static actionArrayDeleteAtIndexOrdered(records, options) {
    return this.actionArrayDeleteAtIndex(records, options)
      .map((record, i) => record.set('order', i));
  }

  static actionArrayMoveAtIndexOrdered(records, options) {
    return this.actionArrayMoveAtIndex(records, options)
      .map((record, i) => record.set('order', i));
  }

  static actionSave(record, options) {
    console.log('save', record, options);

    return this.duck?.save(record, Object.assign(
      { invalidateList: true },
      options,
    ));
  }

  // TODO check if it is ok to have '/?' in link
  static toLink(record, options = {}) {
    const computedParams = (options.params || Map())
      .filterNot(param => param === undefined);

    if (process.env.NODE_ENV !== 'production') {
      if (!this.urlBase) throw new Error(`entity[${this.name}] (toLink): "urlBase" must be set.`);
      if (!/^\/.*\/$/.test(this.urlBase)) throw new Error(`entity[${this.name}] (toLink): "urlBase" property must start with a "/" and end with a "/"`);
      if (computedParams.some(value => !_isString(value))) throw new Error(`entity[${this.name}] (toLink): every params must be a string or undefined`); if (!/^\/.*\/$/.test(this.urlBase)) throw new Error(`entity[${this.name}] (toLink): "urlBase" property must start with a "/" and end with a "/"`);
    }

    return `${this.urlBase}${this.getId(record, options)}/?${queryString.stringify(computedParams.toJS())}`;
  }

  // TODO check if valid default
  static toLocale(record) {
    return record?.get('locale') || {};
  }

  static toString(record) {
    return record?.get('title') || '';
  }

  static toStringOrdered(record) {
    return record
      ? `${record.get('order') + 1}. ${this.toString(record)}`
      : '';
  }

  static toUrl(record, options = {}) {
    const computedParams = (options.params || Map)
      .remove('page')
      .remove('page_size')
      .filterNot(param => param === undefined);

    if (process.env.NODE_ENV !== 'production') {
      if (!this.urlBase) throw new Error(`entity[${this.name}] (toUrl): "urlBase" must be set.`);
      if (!/^\/.*\/$/.test(this.urlBase)) throw new Error(`entity[${this.name}] (toUrl): "urlBase" property must start with a "/" and end with a "/"`);
      if (computedParams.some(param => !_isString(param))) throw new Error(`entity[${this.name}] (toUrl): every params must be a string or undefined`);
      if (!options.settings) throw new Error(`entity[${this.name}] (toUrl): "settings" option must be set.`);
      if (!options.settings.BASE_URL) throw new Error(`entity[${this.name}] (toUrl): "settings.BASE_URL" must be set.`);
    }

    return `${options.settings.BASE_URL}${this.urlBase}${this.getId(record, options)}/?${queryString.stringify(computedParams.toJS())}`;
  }

  static toUrlExport({ params = Map(), settings } = {}) {
    const computedParams = params
      .remove('page')
      .remove('page_size')
      .filterNot(param => param === undefined);

    if (process.env.NODE_ENV !== 'production') {
      if (!this.apiBase) throw new Error(`entity[${this.name}] (toUrlExport): "apiBase" must be set.`);
      if (!/^\/.*\/$/.test(this.apiBase)) throw new Error(`entity[${this.name}] (toUrlExport): "apiBase" property must start with a "/" and end with a "/"`);
      if (computedParams.some(param => !_isString(param))) throw new Error(`entity[${this.name}] (toUrlExport): every params must be a string or undefined`);
      if (!settings) throw new Error(`entity[${this.name}] (toUrlExport): "settings" option must be set.`);
      if (!settings.BASE_API_URL) throw new Error(`entity[${this.name}] (toUrlExport): "settings.BASE_API_URL" must be set.`);
    }

    return `${settings.BASE_API_URL}${this.apiBase}?${queryString.stringify(computedParams.toJS())}&format=xlsx`;
  }
}
