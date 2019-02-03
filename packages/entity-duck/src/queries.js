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

  onChange() {
    return undefined;
  }

  processing() {
    return false;
  }

  processingDidFail() {
    return false;
  }

  pagination() {
    return undefined;
  }

  value() {
    return undefined;
  }

  valueInitial() {
    return undefined;
  }
}
