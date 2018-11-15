import _compose from 'lodash/fp/compose';
import _isFunction from 'lodash/isFunction';
import _mapValues from 'lodash/fp/mapValues';
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
      if (!options.entity || !Entity.isEntity(options.entity)) throw new Error(`Duck[${this.constructor.name}]: "entity" option must be child of "Entity"`);
      if (!options.app) throw new Error(`Duck[${this.constructor.name}] (${options.entity.name}): "app" option is required`);
    }

    const actions = _mapValues.convert({ cap: false })(
      (actionFactory, action) => _compose(
        actionFactory({ entity: options.entity, keyAction: action }),
        this.constructor.toKey(options.app, options.entity),
      )(action),
    )(this.constructor.actions);

    Object.assign(this, actions, options);
  }

  createReducer() {
    const duck = this.constructor;
    const initialState = duck.getInitialState({ entity: this.entity });

    return _compose(
      reducerMap => handleActions(reducerMap, initialState),
      types => duck.getReducers(types, initialState),
      _mapValues.convert({ cap: false })((_, keyAction) => duck.toKey(this.app, this.entity)(keyAction)),
    )(duck.actions);
  }
}
