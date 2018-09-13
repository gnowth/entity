import _compose from 'lodash/fp/compose';
import _isFunction from 'lodash/fp/isFunction';
import _mapValues from 'lodash/fp/mapValues';
import { handleActions } from 'redux-actions'; // TODO remove dependency
import { Entity } from 'lib/entity';

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

  constructor(options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options) throw new Error('\'options\' are required when creating a Duck');
      if (!options.entity) throw new Error('\'entity\' option is required when creating a Duck');
      if (!Entity.isEntity(options.entity)) throw new Error('\'entity\' option must be child of \'Entity\' when creating a Duck');
      if (!options.app) throw new Error('\'app\' option is required when creating a Duck');
      // TODO check that app start with capital letter
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

  getMode(mode) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.constructor.modes[mode]) throw new Error(`Duck: ${mode} mode is invalid`);
    }

    return this.constructor.modes[mode];
  }
}
