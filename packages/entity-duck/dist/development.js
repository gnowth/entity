import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import _compose from 'lodash/fp/compose';
import _isFunction from 'lodash/fp/isFunction';
import _mapValues from 'lodash/fp/mapValues';
import { handleActions } from 'redux-actions';
import { Entity } from '@gnowth/entity';
import 'core-js/modules/es6.regexp.search';
import _omit from 'lodash/fp/omit';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map as Map$1 } from 'immutable';
import { connect } from 'react-redux';
import _debounce from 'lodash/fp/debounce';
import _endsWith from 'lodash/fp/endsWith';
import axios from 'axios';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

const _React$createContext = React.createContext({}),
      Provider = _React$createContext.Provider,
      DuckConsumer = _React$createContext.Consumer;
const DuckProvider = (_ref) => {
  let children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return React.createElement(Provider, {
    value: props
  }, children);
};
DuckProvider.propTypes = exact({
  children: PropTypes.node.isRequired,
  processingComponent: PropTypesPlus.isRequiredIf('processingComponentProps', PropTypesPlus.component),
  processingComponentProps: PropTypes.shape({}),
  processingDidFailComponent: PropTypesPlus.isRequiredIf('processingDidFailComponentProps', PropTypesPlus.component),
  processingDidFailComponentProps: PropTypes.shape({}),
  recordsCountComponent: PropTypesPlus.isRequiredIf('recordsCountComponentProps', PropTypesPlus.component),
  recordsCountComponentProps: PropTypes.shape({}),
  recordsCountNoneComponent: PropTypesPlus.isRequiredIf('recordsCountNoneComponentProps', PropTypesPlus.component),
  recordsCountNoneComponentProps: PropTypes.shape({}),
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired
  }).isRequired
});
DuckProvider.defaultProps = {
  processingComponent: undefined,
  processingComponentProps: undefined,
  processingDidFailComponent: undefined,
  processingDidFailComponentProps: undefined,
  recordsCountComponent: undefined,
  recordsCountComponentProps: undefined,
  recordsCountNoneComponent: undefined,
  recordsCountNoneComponentProps: undefined
};
const withDuck = Component => function DuckedComponent(props) {
  return React.createElement(DuckConsumer, null, context => React.createElement(Component, _extends({}, context, props)));
};

class Duck {
  static createAction({
    defaultMeta,
    meta = ({
      options
    }) => options,
    payload: payloadCreator = options => options.payload
  } = {}) {
    return ({
      entity,
      keyAction
    }) => type => (payload, options = {}) => ({
      type,
      meta: Object.assign({
        keyAction,
        entity
      }, _isFunction(defaultMeta) ? defaultMeta({
        entity,
        options,
        payload
      }) : defaultMeta, meta({
        entity,
        options,
        payload
      })),
      payload: payloadCreator({
        entity,
        options,
        payload
      })
    });
  }

  static getInitialState({
    entity
  }) {
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
      if (!options.app) throw new Error('\'app\' option is required when creating a Duck'); // TODO check that app start with capital letter
    }

    const actions = _mapValues.convert({
      cap: false
    })((actionFactory, action) => _compose(actionFactory({
      entity: options.entity,
      keyAction: action
    }), this.constructor.toKey(options.app, options.entity))(action))(this.constructor.actions);

    Object.assign(this, actions, options);
  }

  createReducer() {
    const duck = this.constructor;
    const initialState = duck.getInitialState({
      entity: this.entity
    });
    return _compose(reducerMap => handleActions(reducerMap, initialState), types => duck.getReducers(types, initialState), _mapValues.convert({
      cap: false
    })((_, keyAction) => duck.toKey(this.app, this.entity)(keyAction)))(duck.actions);
  }

}

var withPropTypes = (({
  displayName,
  propTypes,
  defaultProps
} = {}) => Component => {
  const withPropTypes = props => {
    return React.createElement(Component, props);
  };

  withPropTypes.propTypes = propTypes;
  withPropTypes.defaultProps = defaultProps;
  withPropTypes.displayName = `withPropTypes-${displayName}`;
  return withPropTypes;
});

function withState ({
  initialState = {},
  mapProps: {
    state = 'state',
    setState = 'setState'
  } = {}
}) {
  return ComposedComponent => class withState extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", _isFunction(initialState) ? initialState(this.props) : initialState);

      _defineProperty(this, "mounted", true);
    }

    // TODO find better pattern or mute only errors coming from onInputChange
    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const props = Object.assign({}, this.props, {
        [state]: this.state,
        [setState]: (...args) => this.mounted && this.setState(...args)
      });
      return React.createElement(ComposedComponent, props);
    }

  };
}

const createDuckRef = action => ({
  clear: (dispatch, options) => action.meta.keyClear && dispatch(action.meta.entity.duck[action.meta.keyClear](options)),
  pagination: (state, options) => action.meta.keyPagination && action.meta.entity.duck[action.meta.keyPagination](state, options),
  record: (state, options) => action.meta.keyRecord && action.meta.entity.duck[action.meta.keyRecord](state, options),
  save: (dispatch, value, options) => action.meta.keySave && dispatch(action.meta.entity.duck[action.meta.keySave](value, options)),
  status: (state, options) => !!action.meta.keyStatus && action.meta.entity.duck[action.meta.keyStatus](state, options)
});

const mapStateToProps = (state, props) => {
  const action = props.withQueryDuckContainer_state.action || props.action({
    search: props.withQueryDuckContainer_state.search
  });
  const duckRef = createDuckRef(action);
  return Object.assign({
    action,
    duckRef,
    params: action.meta.params,
    entity: action.meta.entity,
    initialValue: duckRef.record(state, action.meta),
    inputValue: props.withQueryDuckContainer_state.search,
    isProcessing: s => duckRef.status(s, _objectSpread({}, action.meta, {
      status: action.meta.keyProcessing
    })),
    processing: duckRef.status(state, _objectSpread({}, action.meta, {
      status: action.meta.keyProcessing
    })),
    processingDidFail: duckRef.status(state, _objectSpread({}, action.meta, {
      status: action.meta.keyProcessingDidFail
    })),
    value: duckRef.record(state, _objectSpread({}, action.meta, {
      dirty: true
    }))
  }, action.meta.id === undefined && action.meta.entity.paginated && {
    pagination: duckRef.pagination(state, action.meta)
  });
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, _omit(['withQueryDuckContainer_setState', 'withQueryDuckContainer_state'])(ownProps), stateProps, dispatchProps, {
  clear: options => stateProps.duckRef.clear(dispatchProps.dispatch, _objectSpread({}, stateProps.action.meta, options)),
  onInputChange: search => ownProps.withQueryDuckContainer_setState({
    search
  }),
  process: () => !stateProps.processing && !stateProps.processingDidFail && dispatchProps.dispatch(ownProps.action({
    search: ownProps.withQueryDuckContainer_state.search
  })),
  save: value => stateProps.duckRef.save(dispatchProps.dispatch, value, _objectSpread({}, stateProps.action.meta, {
    dirty: true
  }))
}); // TODO remove exact or withPropTypes


var withQueryDuckContainer = _compose(withPropTypes({
  displayName: 'QueryDuckContainer',
  propTypes: exact({
    action: PropTypes.func.isRequired,
    children: PropTypes.func,
    // TODO check with component
    component: PropTypesPlus.component,
    componentProps: PropTypes.shape({}),
    filterParams: PropTypesImmutable.map
  }),
  defaultProps: {
    children: undefined,
    componentProps: undefined,
    filterParams: Map$1()
  }
}), withState({
  initialState: {
    action: undefined,
    search: ''
  },
  mapProps: {
    state: 'withQueryDuckContainer_state',
    setState: 'withQueryDuckContainer_setState'
  }
}), connect(mapStateToProps, null, mergeProps), withDuck);

class QueryDuck extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", ({
      target: {
        index,
        name,
        value
      }
    }) => {
      if (process.env.NODE_ENV !== 'production') {
        if (name !== this.props.name) throw new Error(`QueryDuck (onChange): "${name}" name provided. Expecting name "${this.props.name}"`);
        if (this.props.id !== undefined && index !== undefined) throw new Error('QueryDuck (onChange): index must be undefined as value is not a list');
        if (index === null) throw new Error('QueryDuck (onChange): index cannot be null');
      }

      return this.props.save(index === undefined ? value : this.props.value.set(index, value));
    });

    _defineProperty(this, "handleInputChange", _debounce(500)(this.props.onInputChange));
  }

  componentDidMount() {
    /**
     * HACK(thierry): reading directly from the store
     * to get the latest processing to prevent multiple network call
     */
    const shouldProcess = !this.props.isProcessing(this.props.store.getState()) && !(this.props.value && this.props.cached);

    if (shouldProcess) {
      this.props.process();
    }
  }

  componentDidUpdate() {
    const shouldProcess = !this.props.isProcessing(this.props.store.getState()) && !this.props.value;

    if (shouldProcess) {
      this.props.process();
    }
  }

  componentWillUnmount() {
    if (!this.props.persist) {
      this.props.clear();
    }

    if (this.props.persist && !this.props.persistDirty) {
      this.props.clear({
        dirty: true
      });
    }
  }

  getProps() {
    return Object.assign({
      field: this.props.entity.toEntityField(),
      initialValue: this.props.initialValue,
      inputValue: this.props.inputValue,
      name: this.props.name,
      onChange: this.handleChange,
      onInputChange: this.handleInputChange,
      value: this.props.value
    }, !this.props.shouldProcess && {
      processing: this.props.processing,
      processingDidFail: this.props.processingDidFail
    });
  }

  renderAsComponent(props) {
    return React.createElement(React.Fragment, null, this.props.shouldProcess && this.props.processing && this.props.processingComponent && React.createElement(this.props.processingComponent, this.props.processingComponentProps || {}), this.props.shouldProcess && this.props.processingDidFail && this.props.processingDidFailComponent && React.createElement(this.props.processingDidFailComponent, this.props.processingDidFailComponentProps || {}), this.props.shouldProcess && !this.props.processing && !this.props.processingDidFail && !this.props.recordsCountHidden && this.props.value !== undefined && React.createElement(this.props.recordsCountComponent, _extends({
      value: this.props.entity.paginated && this.props.pagination ? this.props.pagination.get('count') : this.props.value.size
    }, this.props.recordsCountComponentProps || {})), this.props.shouldProcess && !this.props.processing && !this.props.processingDidFail && !this.props.recordsCountHidden && this.props.value !== undefined && React.createElement(this.props.recordsCountNoneComponent, this.props.recordsCountNoneComponentProps || {}), this.props.shouldProcess && !this.props.processing && !this.props.processingDidFail && this.props.value !== undefined && (this.props.many ? this.renderComponentArray(props) : this.renderComponent(props)), !this.props.shouldProcess && this.renderComponent(props));
  }

  renderComponent(props) {
    return React.createElement(this.props.component, _extends({}, props, _isFunction(this.props.componentProps) ? this.props.componentProps(props) : this.props.componentProps || {}));
  }

  renderComponentArray(props) {
    return props.value.map((v, index) => {
      var _props$initialValue, _props$initialValue2;

      return React.createElement(this.props.component, _extends({
        key: this.props.entity.getId(v)
      }, props, {
        index: index,
        initialValue: (_props$initialValue = props.initialValue) === null || _props$initialValue === void 0 ? void 0 : _props$initialValue.get(index),
        records: props.value,
        value: v
      }, _isFunction(this.props.componentProps) ? this.props.componentProps(Object.assign({}, props, {
        index,
        initialValue: (_props$initialValue2 = props.initialValue) === null || _props$initialValue2 === void 0 ? void 0 : _props$initialValue2.get(index),
        records: props.value,
        value: v
      })) : this.props.componentProps || {}));
    });
  }

  render() {
    return this.props.children ? this.props.children(this.getProps()) : this.renderAsComponent(this.getProps());
  }

}

QueryDuck.propTypes = {
  cached: PropTypes.bool,
  children: PropTypesPlus.isRequiredIfNot('component', PropTypes.func),
  clear: PropTypes.func.isRequired,
  entity: PropTypes.shape({
    duck: PropTypes.instanceOf(Duck),
    prototype: PropTypes.instanceOf(Entity)
  }).isRequired,
  component: PropTypesPlus.isRequiredIf('componentProps', PropTypesPlus.component),
  componentProps: PropTypes.shape({}),
  id: PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypesImmutable.list, PropTypesImmutable.map]),
  // TODO add: PropTypesPlus.ifElse(({ id }) === undefined, PropTypesImmutable.List, PropTypesImmutable.map)
  inputValue: PropTypes.string,
  isProcessing: PropTypes.func.isRequired,
  many: PropTypes.bool,
  // TODO add: PropTypesPlus.notRequiredIf(({ id }) => id !== undefined)
  name: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  pagination: PropTypesImmutable.map,
  // PropTypesPlus.isRequiredIf(({ entity }) => entity?.paginated, PropTypesImmutable.map), // TODO add shape? innitialValue?
  params: PropTypesImmutable.map.isRequired,
  persist: PropTypes.bool,
  persistDirty: PropTypes.bool,
  // TODO add: PropTypesPlus.notRequiredIf(({ persist }) => !persist)
  process: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
  processingComponent: PropTypesPlus.isRequiredIf('processingComponentProps', PropTypesPlus.component),
  processingComponentProps: PropTypes.shape({}),
  processingDidFail: PropTypes.bool.isRequired,
  processingDidFailComponent: PropTypesPlus.isRequiredIf('processingDidFailComponentProps', PropTypesPlus.component),
  processingDidFailComponentProps: PropTypes.shape({}),
  recordsCountComponent: PropTypesPlus.isRequiredIf('recordsCountComponentProps', PropTypesPlus.component),
  recordsCountComponentProps: PropTypes.shape({}),
  recordsCountHidden: PropTypes.bool,
  recordsCountNoneComponent: PropTypesPlus.isRequiredIf('recordsCountNoneComponentProps', PropTypesPlus.component),
  recordsCountNoneComponentProps: PropTypes.shape({}),
  save: PropTypes.func.isRequired,
  shouldProcess: PropTypes.bool,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired
  }).isRequired,
  value: PropTypes.oneOfType([PropTypesImmutable.list, PropTypesImmutable.map]) // TODO add: PropTypesPlus.ifElse(({ id }) === undefined, PropTypesImmutable.List, PropTypesImmutable.map)

};
QueryDuck.defaultProps = {
  cached: true,
  children: undefined,
  component: undefined,
  componentProps: undefined,
  id: undefined,
  initialValue: undefined,
  inputValue: '',
  many: undefined,
  name: 'query_duck',
  pagination: undefined,
  persist: true,
  persistDirty: undefined,
  processingComponent: undefined,
  processingComponentProps: undefined,
  processingDidFailComponent: undefined,
  processingDidFailComponentProps: undefined,
  recordsCountComponent: undefined,
  recordsCountComponentProps: undefined,
  recordsCountHidden: false,
  recordsCountNoneComponent: undefined,
  recordsCountNoneComponentProps: undefined,
  shouldProcess: false,
  value: undefined
};
var queryDuck = withQueryDuckContainer(QueryDuck);

const handleResponse = (action, dispatch) => response => {
  dispatch(action.meta.entity.duck[`${action.meta.keyAction}_resolved`](response.data, Object.assign({
    payload: action.payload
  }, action.meta)));

  if (_isFunction(action.meta.then)) {
    action.meta.then(_objectSpread({}, action, {
      response
    }));
  }
};

const handleError = (action, dispatch) => error => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error); // eslint-disable-line no-console
  }

  dispatch(action.meta.entity.duck[`${action.meta.keyAction}_rejected`](error, Object.assign({
    payload: action.payload
  }, action.meta)));

  if (_isFunction(action.meta.catch)) {
    action.meta.catch(_objectSpread({}, action, {
      error
    }));
  }
};

var middleware = (store => next => action => {
  var _action$meta, _action$meta2, _action$meta2$entity;

  const shouldSkipMiddleware = !((_action$meta = action.meta) === null || _action$meta === void 0 ? void 0 : _action$meta.useEntityMiddleware) || _endsWith('_RESOLVED')(action.type) || _endsWith('_REJECTED')(action.type) || !(((_action$meta2 = action.meta) === null || _action$meta2 === void 0 ? void 0 : (_action$meta2$entity = _action$meta2.entity) === null || _action$meta2$entity === void 0 ? void 0 : _action$meta2$entity.duck) instanceof Duck);

  if (shouldSkipMiddleware) {
    return next(action);
  }

  const customAction = action.meta.action ? `${action.meta.action}/` : '';
  const args = [action.meta.id ? `${action.meta.entity.apiBase}${action.meta.id}/${customAction}` : `${action.meta.entity.apiBase}${customAction}`, ...(action.payload ? [action.meta.entity.recordToData(action.payload)] : []), {
    params: action.meta.params && action.meta.params.filter(p => p).toJS() // TODO check that it is a string

  }];
  axios[action.meta.method].apply(null, args).then(handleResponse(action, store.dispatch)).catch(handleError(action, store.dispatch));
  return next(action);
});

export { Duck, queryDuck as QueryDuck, middleware as duckMiddleware, Provider, DuckConsumer, DuckProvider, withDuck };
//# sourceMappingURL=development.js.map
