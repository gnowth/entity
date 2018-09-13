import { connect } from 'react-redux';

import { callIfFunction, mapX, mapValues, toObjectIfArray } from 'lib/context-methods';

export { default as createAction } from './action';

export class Duck {
  static defaultOptions = {
    actions: {},
    initialState: {},
    selectors: {},
    reducers: () => ({}),
  };

  static createKeyFactory({ namespace, store }) {
    if (process.env.NODE_ENV !== 'production') {
      if (!namespace) {
        throw new Error('Redux-Duck: \'namespace\' property is required for constructor');
      }

      if (!store) {
        throw new Error('Redux-Duck: \'store\' property is required for constructor');
      }
    }

    return key => `@@${namespace}/${store.toUpperCase()}_${key.toUpperCase()}`;
  }

  constructor(options = {}) {
    const createKey = Duck.createKeyFactory(options);
    this.options = Object.assign({}, Duck.defaultOptions, options);

    this.store = this.options.store;
    this.initialState = this.options.initialState::callIfFunction();
    this.types = this.options.actions::mapValues((_, key) => createKey(key));
    this.defaultActions = this.options.defaultActions || Object.keys(this.options.actions);
    this.defaultSelectors = this.options.defaultSelectors || Object.keys(this.options.selectors);
    this.selectors = this.options.selectors;
    this.reducer = this.reducer.bind(this);

    this.actions = this.options.actions
      ::mapValues((actionFactory, key) => actionFactory(createKey(key)));

    this.actionsConnect = this.actions
      ::mapValues(action => actionOptions => payload => action(payload, actionOptions));

    this.selectorsConnect = this.selectors
      ::mapValues(selector => selectorOptions => state => selector(state, selectorOptions));
  }

  connect({ selectors = {}, actions = {} } = {}) {
    const mapStateToProps = (state, props) => selectors
      ::toObjectIfArray(value => value)
      ::mapX((_, key) => this.selectors[key](state, props));

    const mapDispatchToProps = (dispatch, props) => actions
      ::toObjectIfArray(value => value)
      ::mapX(
        (_, key) => (payload, options) => dispatch(
          this.actions[key](payload, { props, ...options }),
        ),
      );

    return connect(mapStateToProps, mapDispatchToProps);
  }

  connectDefault() {
    return this.connect({
      selectors: this.defaultSelectors,
      actions: this.defaultActions,
    });
  }

  connectActions(actions) {
    const mapDispatchToProps = (dispatch, props) => actions::mapValues(
      action => payload => dispatch(
        action({ props, actions: this.actionsConnect })(payload),
      ),
    );

    return connect(null, mapDispatchToProps);
  }

  connectSelectors(selectors) {
    const mapStateToProps = (state, props) => selectors::mapValues(
      selector => selector({ props, selectors: this.selectorsConnect })(state),
    );

    return connect(mapStateToProps);
  }

  reducer(state = this.initialState, action) {
    const reducerMap = this.options.reducers(this);
    const currentReducer = reducerMap[action.type] || (x => x);
    return currentReducer(state, action);
  }

  extend(newOptions = {}) {
    const options = Object.assign(
      {},
      this.options,
      newOptions::callIfFunction(this.options),
    );

    return new Duck({
      ...options,

      actions: {
        ...this.options.actions,
        ...newOptions.actions,
      },

      selectors: {
        ...this.options.selectors,
        ...newOptions.selectors,
      },

      reducers: reducerOptions => ({
        ...this.options.reducers(reducerOptions),
        ...newOptions.reducers(reducerOptions),
      }),
    });
  }
}

export default Duck;
