import Duck from '@entity/duck';

export default class QueriesDRF extends Duck.Queries {
  bypassActions = ['clear', 'save_local']

  supportedActions = {
    clear: ['get', 'options'],
    errors: ['delete', 'get', 'options', 'save'],
    onChange: ['get'],
    pagination: ['get'],
    processing: ['delete', 'get', 'options', 'save'],
    processingDidFail: ['delete', 'get', 'options', 'save'],
    value: ['get', 'options'],
    valueInitial: ['get'],
  }

  clear(action = {}, meta = {}) {
    return this.hasSupport('clear', action)
      ? action.duck?.actions?.clear({
        ...action.meta,
        ...meta,
        sideEffect: false,
      })
      : super.clear(action, meta);
  }

  errors(action = {}, state, meta = {}) {
    return !this.shouldBypass(action) && this.hasSupport('errors', action)
      ? action.duck?.selectors?.errors(state, {
        ...action.meta,
        ...meta,
      })
      : super.errors(action, state, meta);
  }

  onChange(action = {}, payload, meta = {}) {
    return this.hasSupport('onChange', action, ['options'])
      ? action.duck?.actions?.save_local(payload, {
        ...action.meta,
        ...meta,
        sideEffect: false,
      })
      : super.onChange(action, payload, meta);
  }

  processing(action = {}, state, meta = {}) {
    const statusMap = {
      delete: 'deleting',
      get: 'getting',
      options: 'optioning',
      save: 'saving',
    };

    const result = !this.shouldBypass(action) && this.hasSupport('processing', action)
      ? action.duck?.selectors?.status(state, {
        ...action.meta,
        status: statusMap[action.name],
        ...meta,
      })
      : undefined;

    return result === undefined
      ? super.processing(action, state, meta)
      : result;
  }

  processingDidFail(action = {}, state, meta = {}) {
    const statusMap = {
      delete: 'deletingDidFail',
      get: 'gettingDidFail',
      options: 'optioningDidFail',
      save: 'savingDidFail',
    };

    const result = !this.shouldBypass(action) && this.hasSupport('processingDidFail', action)
      ? action.duck?.selectors?.status(state, {
        ...action.meta,
        status: statusMap[action.name],
        ...meta,
      })
      : undefined;

    return result === undefined
      ? super.processingDidFail(action, state, meta)
      : result;
  }

  pagination(action = {}, state, meta = {}) {
    return this.hasSupport('pagination', action, ['options'])
      ? action.duck?.selectors.pagination(state, {
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
      ? action.duck?.selectors.record(state, { ...action.meta, dirty: true, ...meta })
      : action.duck?.selectors.meta(state, { ...action.meta, ...meta });
  }

  valueInitial(action = {}, state, meta = {}) {
    return this.hasSupport('value', action, ['options'])
      ? action.duck?.selectors.record(state, {
        ...action.meta,
        dirty: false,
        ...meta,
      })
      : super.valueInitial(action, state, meta);
  }
}
