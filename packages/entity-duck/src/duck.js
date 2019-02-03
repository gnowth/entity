import _isFunction from 'lodash/isFunction';
import _mapValues from 'lodash/mapValues';

import Action from './action';
import Queries from './queries';
import Selectors from './selectors';

export default class Duck {
  static Action = Action

  static Queries = Queries

  static Selectors = Selectors

  static getActions() {
    return {};
  }

  static getInitialState(configs = {}) {
    return configs.initialState;
  }

  static getReducers() {
    return {};
  }

  static makeAction(configs) {
    return Object.assign(
      {},
      this.Action,
      configs,
    );
  }

  static makeActions(duck, configs) {
    return _mapValues(
      this.getActions(configs),
      (action, name) => (...args) => {
        const computedAction = {
          ...action,
          configs,
          duck,
          name,
          type: this.makeType(name, configs),
        };

        return computedAction.init(...args);
      },
    );
  }

  static makeQueries(configs) {
    return new this.Queries(configs);
  }

  static makeReducers(types, initialState, configs) {
    const reducerMap = this.getReducers(types, initialState, configs);

    return (state = initialState, action) => (
      _isFunction(reducerMap[action.type])
        ? reducerMap[action.type](state, action)
        : state
    );
  }

  static makeSelectors(duck, configs = {}) {
    return new this.Selectors({ duck, ...configs });
  }

  static makeType(name, configs = {}) {
    return `@@${configs.app}/${configs.namespace}/${configs.name.toUpperCase()}_${name.toUpperCase()}`;
  }

  static makeTypes(configs = {}) {
    return _mapValues(
      this.getActions(configs),
      (action, name) => this.makeType(name, configs),
    );
  }

  constructor(configs = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.constructor.namespace) throw new Error(`@entity-duck Duck [name: ${this.constructor.name}]: static namespace is required`);
      if (!/^[A-Z]/.exec(configs.app)) throw new Error(`${this.constructor.name}.constructor (${configs.name}): "app" option must start with a capital letter`);
    }

    const computedConfigs = {
      namespace: this.constructor.namespace,
      ...configs,
    };

    this.initialState = this.constructor.getInitialState(computedConfigs);
    this.queries = this.constructor.makeQueries(computedConfigs);
    this.selectors = this.constructor.makeSelectors(this, computedConfigs);
    this.types = this.constructor.makeTypes(computedConfigs);
    this.reducer = this.constructor.makeReducers(this.types, this.initialState, computedConfigs);
    this.actions = this.constructor.makeActions(this, computedConfigs);

    Object.assign(this, computedConfigs);
  }

  makeActions(dispatch) {
    return _mapValues(
      this.actions,
      action => (...args) => dispatch(action(...args)),
    );
  }
}
