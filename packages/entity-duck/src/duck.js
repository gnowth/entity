import _flowRight from 'lodash/flowRight';
import _isFunction from 'lodash/isFunction';
import _mapValues from 'lodash/mapValues';
import { Entity } from '@entity/core';
import { handleActions } from 'redux-actions';

export default class Duck {
  static createAction({
    defaultMeta,
    meta = ({ options }) => options,
    payload: payloadCreator = options => options.payload,
  } = {}) {
    return ({ entity, keyAction }) => type => (payload, options = {}) => ({
      type,
      meta: Object.assign(
        { keyAction, entity },
        _isFunction(defaultMeta) ? defaultMeta({ entity, options, payload }) : defaultMeta,
        meta({ entity, options, payload }),
      ),
      payload: payloadCreator({ entity, options, payload }),
    });
  }

  static getInitialState({ entity }) {
    return entity.dataToRecord({});
  }

  static toKey(app, entity) {
    return keyAction => `@@${app}/${this.namespace}/${entity.name.toUpperCase()}_${keyAction.toUpperCase()}`;
  }

  constructor(options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options.entity || !Entity.isEntity(options.entity)) throw new Error(`${this.constructor.name}.constructor: "entity" option must be child of "Entity"`);
      if (!/^[A-Z]/.exec(options.app)) throw new Error(`${this.constructor.name}.constructor (${options.entity.name}): "app" option must start with a capital letter`);
    }

    const actions = _mapValues(
      this.constructor.actions,
      (actionFactory, action) => _flowRight(
        actionFactory({ entity: options.entity, keyAction: action }),
        this.constructor.toKey(options.app, options.entity),
      )(action),
    );

    Object.assign(this, actions, options);
  }

  createReducer() {
    const duck = this.constructor;
    const initialState = duck.getInitialState({ entity: this.entity });

    return _flowRight(
      reducerMap => handleActions(reducerMap, initialState),
      types => duck.getReducers(types, initialState),
      actions => _mapValues(
        actions,
        (_, keyAction) => duck.toKey(this.app, this.entity)(keyAction),
      ),
    )(duck.actions);
  }
}
