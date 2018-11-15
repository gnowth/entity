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

  static paths = {
    urlBase: '',
  }

  static actionArchive(record, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.duck?.save) throw new Error(`EntityTitle.actionArchive (${this.name}): "save" action is required in duck`);
    }

    return this.duck.save(record, {
      action: 'archive',
      method: 'post',
      ...options,
    });
  }

  static actionArrayDeleteAtIndexOrdered(records, options) {
    return this.actionArrayDeleteAtIndex(records, options)
      .map((record, i) => record.set('order', i));
  }

  static actionArrayMoveAtIndexOrdered(records, options) {
    return this.actionArrayMoveAtIndex(records, options)
      .map((record, i) => record.set('order', i));
  }

  static actionSave(record, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.duck?.save) throw new Error(`EntityTitle.actionSave (${this.name}): "save" action is required in duck`);
    }

    return this.duck.save(record, {
      invalidateList: true,
      ...options,
    });
  }

  static toLink(record, options = {}) {
    const computedParams = (options.params || Map())
      .filterNot(param => param === undefined);

    if (process.env.NODE_ENV !== 'production') {
      if (!/^\/.*\/$/.test(this.paths?.urlBase)) throw new Error(`EntityTitle.toLink (${this.name}): "urlBase" property must start with a "/" and end with a "/"`);
      if (computedParams.some(value => !_isString(value))) throw new Error(`EntityTitle.toLink (${this.name}): every params must be a string or undefined`);
    }

    return `${this.paths?.urlBase}${this.getId(record, options)}/?${queryString.stringify(computedParams.toJS())}`;
  }

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
      if (!/^\/.*\/$/.test(this.paths?.urlBase)) throw new Error(`EntityTitle.toUrl (${this.name}): "urlBase" property must start with a "/" and end with a "/"`);
      if (computedParams.some(param => !_isString(param))) throw new Error(`EntityTitle.toUrl (${this.name}): every params must be a string or undefined`);
      if (!options.settings?.BASE_URL) throw new Error(`EntityTitle.toUrl (${this.name}): "settings.BASE_URL" must be set.`);
    }

    return `${options.settings.BASE_URL}${this.paths?.urlBase}${this.getId(record, options)}/?${queryString.stringify(computedParams.toJS())}`;
  }

  static toUrlExport({ params = Map(), settings } = {}) {
    const computedParams = params
      .remove('page')
      .remove('page_size')
      .filterNot(param => param === undefined);

    if (process.env.NODE_ENV !== 'production') {
      if (!/^\/.*\/$/.test(this.path?.apiBase)) throw new Error(`EntityTitle.toUrlExport (${this.name}): "apiBase" property must start with a "/" and end with a "/"`);
      if (computedParams.some(param => !_isString(param))) throw new Error(`EntityTitle.toUrlExport (${this.name}): every params must be a string or undefined`);
      if (!settings?.BASE_API_URL) throw new Error(`EntityTitle.toUrlExport (${this.name}): "settings.BASE_API_URL" must be set.`);
    }

    return `${settings.BASE_API_URL}${this.paths?.apiBase}?${queryString.stringify(computedParams.toJS())}&format=xlsx`;
  }
}
