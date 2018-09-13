import { List } from 'immutable';
import { stringify } from 'query-string';

import Duck from './duck';
import reducerDelete from './reducer-delete';
import reducerGet from './reducer-get';
import reducerList from './reducer-list';
import reducerListAll from './reducer-listAll';
import reducerOptions from './reducer-options';
import reducerSave from './reducer-save';

export default class EntityDuck extends Duck {
  static namespace = 'entities';

  static getIdentifier = defaultMethod => ({ params, method = defaultMethod } = {}) => `${method}.${stringify(params)}`;

  static actions = {
    get: Duck.createAction(),
    get_resolved: Duck.createAction(),
    get_failed: Duck.createAction(),

    list: Duck.createAction(),
    list_resolved: Duck.createAction(),
    list_failed: Duck.createAction(),

    listAll: Duck.createAction(),
    listAll_resolved: Duck.createAction(),
    listAll_failed: Duck.createAction(),

    options: Duck.createAction(),
    options_resolved: Duck.createAction(),
    options_failed: Duck.createAction(),

    save: Duck.createAction(),
    save_resolved: Duck.createAction(),
    save_failed: Duck.createAction(),

    delete: Duck.createAction(),
    delete_resolved: Duck.createAction(),
    delete_failed: Duck.createAction(),
  };

  static getReducers(types) {
    return {
      ...reducerDelete(types),
      ...reducerGet(types),
      ...reducerList(types),
      ...reducerListAll(types),
      ...reducerOptions(types),
      ...reducerSave(types),
    };
  }

  record(state, options) {
    const identifier = this.constructor.getIdentifier('get')(options);
    const id = options.method === 'get' && !options.params ? options.id : identifier;

    return state.getIn([this.constructor.namespace, this.entity.name, 'detail', id], Map());
  }

  records(state, options) {
    return state.getIn(
      [this.constructor.namespace, this.entity.name, 'list', this.constructor.getIdentifier('list')(options), ...(this.entity.paginated && ['results'])],
      List(),
    );
  }

  options(state, options) {
    return state.getIn(
      [this.constructor.namespace, this.entity.name, 'options', this.constructor.getIdentifier('options')(options)],
      Map(),
    );
  }

  status(state, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options.status) {
        throw new Error('Duck-Entities: \'status\' property is required for status selector');
      }

      if (!options.method) {
        throw new Error('Duck-Entities: \'method\' property is required for status selector');
      }
    }

    return state.getIn([this.constructor.namespace, this.entity.name, 'status', options.status, this.constructor.getIdentifier()(options)]);
  }

  hasPermissions(state, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options.permission) {
        throw new Error('Duck-Entities: \'permission\' property is required for permission selector');
      }

      if (!options.method) {
        throw new Error('Duck-Entities: \'method\' property is required for status selector');
      }
    }

    const permissions = state.getIn(
      [this.constructor.namespace, this.entity.name, 'options', this.constructor.getIdentifier()(options), 'permissions'],
      List(),
    );

    const requiredPermissions = Array.isArray(options.permissions)
      ? options.permissions
      : [options.permissions];

    return !!requiredPermissions.find(permission => permissions.includes(permission));
  }
}
