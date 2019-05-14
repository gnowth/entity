import Duck from '@burnsred/entity-duck';

export default class DjangoRestFramework extends Duck.Queries {
  bypassActions = ['clear', 'save_local']

  statusMap = {
    delete: 'deleting',
    get: 'getting',
    options: 'optioning',
    save: 'saving',
  };

  statusMapDidFail = {
    delete: 'deletingDidFail',
    get: 'gettingDidFail',
    options: 'optioningDidFail',
    save: 'savingDidFail',
  }

  supportedActions = {
    clear: ['get', 'options'],
    errors: ['delete', 'get', 'options', 'save'],
    onChange: ['!options', 'get'],
    onSubmit: ['!options', 'get'],
    pagination: ['!options', 'get'],
    processing: ['delete', 'get', 'options', 'save'],
    processingDidFail: ['delete', 'get', 'options', 'save'],
    value: ['get', 'options'],
    valueInitial: ['!options', 'get'],
  }

  clear(action = {}, meta = {}) {
    return this.hasSupport('clear', action)
      ? action.duck.actions.clear({
        ...action.meta,
        sideEffect: false,
        ...meta,
      })
      : super.clear(action, meta);
  }

  errors(action = {}, state, meta = {}) {
    return !this.shouldBypass(action) && this.hasSupport('errors', action)
      ? action.duck.selectors.errors(state, {
        ...action.meta,
        ...meta,
      })
      : super.errors(action, state, meta);
  }

  onChange(action = {}, payload, meta = {}) {
    return this.hasSupport('onChange', action)
      ? action.duck.actions.save_local(payload, {
        ...action.meta,
        sideEffect: false,
        ...meta,
      })
      : super.onChange(action, payload, meta);
  }

  onSubmit(action = {}, payload, meta = {}) {
    return this.hasSupport('onSubmit', action)
      ? action.duck.actions.save(payload, {
        ...action.meta,
        sideEffect: true,
        id: action.meta.id || undefined,
        ...meta,
      })
      : super.onChange(action, payload, meta);
  }

  processing(action = {}, state, meta = {}) {
    const result = !this.shouldBypass(action) && this.hasSupport('processing', action)
      ? action.duck.selectors.status(state, {
        ...action.meta,
        status: this.statusMap[action.name] || action.name,
        ...meta,
      })
      : undefined;

    return result === undefined
      ? super.processing(action, state, meta)
      : result;
  }

  processingDidFail(action = {}, state, meta = {}) {
    const result = !this.shouldBypass(action) && this.hasSupport('processingDidFail', action)
      ? action.duck.selectors.status(state, {
        ...action.meta,
        status: this.statusMapDidFail[action.name] || `${action.name}DidFail`,
        ...meta,
      })
      : undefined;

    return result === undefined
      ? super.processingDidFail(action, state, meta)
      : result;
  }

  pagination(action = {}, state, meta = {}) {
    return this.hasSupport('pagination', action)
      ? action.duck.selectors.pagination(state, {
        ...action.meta,
        ...meta,
      })
      : super.pagination(action, state, meta);
  }

  shouldBypass(action) {
    return this.bypassActions.includes(action.name);
  }

  value(action = {}, state, meta = {}) {
    if (!this.hasSupport('value', action)) {
      return super.value(action, state, meta);
    }

    return action.name === 'get'
      ? action.duck.selectors.record(state, { ...action.meta, dirty: true, ...meta })
      : action.duck.selectors.meta(state, { ...action.meta, ...meta });
  }

  valueInitial(action = {}, state, meta = {}) {
    return this.hasSupport('value', action)
      ? action.duck.selectors.record(state, {
        ...action.meta,
        dirty: false,
        ...meta,
      })
      : super.valueInitial(action, state, meta);
  }
}
