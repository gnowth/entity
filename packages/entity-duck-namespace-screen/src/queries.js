import Duck from '@entity/duck';

export default class QueriesScreen extends Duck.Queries {
  supportedActions = {
    clear: ['get'],
    onChange: ['get'],
    value: ['get'],
    valueInitial: ['get'],
  }

  clear(action = {}, configs = {}) {
    return this.hasSupport('clear', action)
      ? action.duck?.actions?.clear({
        ...action.meta,
        ...configs,
      })
      : super.clear(action.meta);
  }

  onChange(action = {}, payload, configs = {}) {
    return this.hasSupport('onChange', action)
      ? action.duck?.actions?.save_local(payload, {
        ...action.meta,
        ...configs,
      })
      : super.onChange(action, payload, configs);
  }

  value(action = {}, state, configs = {}) {
    return this.hasSupport('value', action)
      ? action.duck?.selectors.record(state, {
        ...action.meta,
        dirty: true,
        ...configs,
      })
      : super.value(action, state, configs);
  }

  valueInitial(action = {}, state, configs = {}) {
    return this.hasSupport('valueInitial', action)
      ? action.duck?.selectors.record(state, {
        ...action.meta,
        dirty: false,
        ...configs,
      })
      : super.valueInitial(action, state, configs);
  }
}
