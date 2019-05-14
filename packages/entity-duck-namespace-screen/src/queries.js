import Duck from '@burnsred/entity-duck';

export default class Screen extends Duck.Queries {
  supportedActions = {
    clear: ['get'],
    onChange: ['get'],
    onSubmit: ['get'],
    value: ['get'],
    valueInitial: ['get'],
  }

  clear(action = {}, meta = {}) {
    return this.hasSupport('clear', action)
      ? action.duck.actions.clear({
        ...action.meta,
        ...meta,
      })
      : super.clear(action.meta);
  }

  onChange(action = {}, payload, meta = {}) {
    return this.hasSupport('onChange', action)
      ? action.duck.actions.save_local(payload, {
        ...action.meta,
        ...meta,
      })
      : super.onChange(action, payload, meta);
  }

  onSubmit(action = {}, payload, meta = {}) {
    return this.hasSupport('onSubmit', action)
      ? action.duck.actions.save(payload, {
        ...action.meta,
        ...meta,
      })
      : super.onChange(action, payload, meta);
  }

  value(action = {}, state, meta = {}) {
    return this.hasSupport('value', action)
      ? action.duck.selectors.record(state, {
        ...action.meta,
        dirty: true,
        ...meta,
      })
      : super.value(action, state, meta);
  }

  valueInitial(action = {}, state, meta = {}) {
    return this.hasSupport('valueInitial', action)
      ? action.duck.selectors.record(state, {
        ...action.meta,
        dirty: false,
        ...meta,
      })
      : super.valueInitial(action, state, meta);
  }
}
