export default class Queries {
  supportedActions = {}

  hasSupport(name, action = {}, ignoredActions = []) {
    const supported = (this.supportedActions[name] || []).includes(action.name);

    if (process.env.NODE_ENV !== 'production') {
      if (!supported && !ignoredActions.includes(action.name)) throw new Error(`@entity-duck queries.${name}: action name "${action.name}" is not supported`);
    }

    return supported;
  }

  clear() {
    return undefined;
  }

  errors() {
    return undefined;
  }

  makeMapStateToProps(action = {}) {
    return state => ({
      errors: action.duck.queries.errors(action, state),
      pagination: action.duck.queries.pagination(action, state),
      processing: action.duck.queries.processing(action, state),
      processingDidFail: action.duck.queries.processingDidFail(action, state),
      value: action.duck.queries.value(action, state),
      valueInitial: action.duck.queries.valueInitial(action, state),
    });
  }

  makeMapDispatchToProps(action = {}) {
    return {
      clear: (...args) => action.duck.queries.clear(action, ...args),
      onChange: (...args) => action.duck.queries.onChange(action, ...args),
      onSubmit: (...args) => action.duck.queries.onSubmit(action, ...args),
      process: () => action,
    };
  }

  onChange() {
    return undefined;
  }

  onSubmit() {
    return undefined;
  }

  pagination() {
    return undefined;
  }

  processing() {
    return false;
  }

  processingDidFail() {
    return false;
  }

  value() {
    return undefined;
  }

  valueInitial() {
    return undefined;
  }
}
