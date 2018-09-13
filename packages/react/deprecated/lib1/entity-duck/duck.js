import _compose from 'lodash/fp/compose';
import _mapValues from 'lodash/fp/mapValues';
import { Entity } from 'lib/entity';

export default class Duck {
  static createAction({ payload: payloadCreator = options => options.payload, meta = ({ options }) => options } = {}) {
    return type => (payload, options = {}) => ({
      type,
      payload: payloadCreator({ payload, options }),
      meta: meta({ payload, options }),
    });
  }

  static toKey(action, app, entity) {
    return `@@${app}/${this.namespace}/${entity.name.toUpperCase()}_${action.toUpperCase()}`;
  }

  constructor(options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!options) throw new Error('\'options\' are required when creating a Duck');
      if (!options.entity) throw new Error('\'entity\' option is required when creating a Duck');
      if (!Entity.isEntity(options.entity)) throw new Error('\'entity\' option must be child of \'Entity\' when creating a Duck');
      if (!options.app) throw new Error('\'app\' option is required when creating a Duck');
    }

    const actions = _mapValues(
      this.constructor.actions,
      (actionFactory, action) => _compose(
        actionFactory,
        this.constructor.toKey(options.app, options.entity),
      )(action),
    );

    Object.assign(this, actions, options);
  }

  createReducer() {
    const duck = this.constructor;

    return _compose(
      duck.getReducers,
      _mapValues(duck.toKey(this.app, this.entity)),
    )(duck.actions);
  }
}
