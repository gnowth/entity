import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import _isFunction from 'lodash/fp/isFunction';
import _compose from 'lodash/fp/compose';
import _getOr from 'lodash/fp/getOr';
import { List, Map as Map$1 } from 'immutable';
import _isObjectLike from 'lodash/fp/isObjectLike';
import { connect } from 'react-redux';
import _isFunction$1 from 'lodash/isFunction';
import _isString from 'lodash/isString';

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
      Consumer = _React$createContext.Consumer;

const _React$createContext2 = React.createContext({
  defaultComponents: {},
  defaultWidgets: {}
}),
      DefaultProvider = _React$createContext2.Provider,
      DefaultConsumer = _React$createContext2.Consumer; // TODO:REMOVE if not being used


const withForm = ComposedComponent => function withFormConsumer(props) {
  return React.createElement(FormConsumer, null, context => React.createElement(ComposedComponent, _extends({}, context, props)));
}; // TODO:REMOVE if not being used

const withFormDefault = ComposedComponent => function withFormDefaultConsumer(props) {
  return React.createElement(FormDefaultConsumer, null, context => React.createElement(ComposedComponent, _extends({}, context, props)));
};
const FormConsumer = Consumer; // TODO:OPTIMISE? props is being generated and it will rerender all the time when children changes

const FormProvider = (_ref) => {
  let children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return React.createElement(Provider, {
    value: props
  }, children);
};
FormProvider.propTypes = exact({
  children: PropTypes.node.isRequired,
  formDisabled: PropTypes.bool,
  formField: PropTypesEntity.field.isRequired,
  formIndex: PropTypes.number,
  formInitialValue: PropTypesImmutable.map,
  formName: PropTypesPlus.string,
  formNameMapper: PropTypes.shape({}),
  formOnChange: PropTypes.func.isRequired,
  formReadOnly: PropTypes.bool,
  formValue: PropTypes.oneOfType([PropTypesImmutable.map, PropTypesImmutable.list]).isRequired
});
FormProvider.defaultProps = {
  formDisabled: false,
  formIndex: undefined,
  formInitialValue: null,
  formName: undefined,
  formNameMapper: {},
  formReadOnly: false
};
const FormDefaultConsumer = DefaultConsumer; // TODO:OPTIMISE? props is being generated and it will rerender all the time when children changes

const FormDefaultProvider = (_ref2) => {
  let children = _ref2.children,
      props = _objectWithoutProperties(_ref2, ["children"]);

  return React.createElement(DefaultProvider, {
    value: props
  }, children);
};
FormDefaultProvider.propTypes = exact({
  children: PropTypes.node.isRequired,
  defaultComponents: PropTypes.shape({
    label: PropTypesPlus.component,
    query: PropTypesPlus.component
  }),
  defaultWidgets: PropTypes.objectOf(PropTypesPlus.component.isRequired)
});
FormDefaultProvider.defaultProps = {
  defaultComponents: {},
  defaultWidgets: {}
};

var withPropMapper = (predicate => ComposedComponent => function withPropMapper(props) {
  if (process.env.NODE_ENV !== 'production') {
    if (!_isFunction(predicate)) throw new Error('withPropMapper: "predicate" must be a function');
  }

  return React.createElement(ComposedComponent, _extends({}, props, predicate(props)));
});

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

function withInput (ComposedComponent) {
  class withInput extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "handleChange", ({
        target
      }) => {
        // TODO check that if name is not define, then index cannot be defined
        const index = target.getAttribute ? target.getAttribute('index') || undefined : target.index;
        const props = this.getProps();
        const nextValue = this.props.willChangeRecord({
          value: props.value,
          field: props.field,
          nextRecord: target.name ? this.props.formValue.setIn(index === undefined ? [target.name] : [target.name, index], props.field.clean(target.value)) : this.props.formValue.merge(target.value),
          nextValue: target.value,
          record: this.props.formValue
        });
        return this.props.formOnChange({
          target: {
            index: this.props.formIndex,
            name: this.props.formName,
            value: nextValue
          }
        });
      });
    }

    getProps() {
      return Object.assign({}, this.props, {
        disabled: this.props.disabled,
        index: this.props.index,
        name: this.props.name || this.props.formName,
        onChange: this.handleChange,
        readOnly: this.props.readOnly,
        value: this.props.formField.getValue(this.props.formValue, {
          name: this.props.name
        }),
        field: this.props.formField.getField({
          name: this.props.name
        }),
        initialValue: this.props.formInitialValue,
        options: List()
      });
    }

    renderComponent(props) {
      return React.createElement(ComposedComponent, props);
    }

    renderQuery(props) {
      return React.createElement(this.props.queryComponent, {
        action: ({
          search
        }) => props.field.entity.duck.get({
          params: Map$1({
            search
          }).merge(this.props.filterParams)
        })
      }, query => this.renderComponent(_objectSpread({}, props, {
        onInputChange: query.onInputChange,
        processing: query.processing,
        processingDidFail: query.processingDidFail,
        options: query.value
      })));
    }

    render() {
      // if (process.env.NODE_ENV !== 'production') {
      //   if (name !== this.props.name) throw new Error(`entity-form (onChange with useValueChange): updating another field "${name}" is not supported. Can only update "${this.props.name}"`);
      // }
      return this.props.apiOptions ? this.renderQuery(this.getProps()) : this.renderComponent(this.getProps());
    }

  }

  withInput.propTypes = {
    apiOptions: PropTypes.bool,
    filterParams: PropTypesImmutable.map,
    formField: PropTypesEntity.entityField.isRequired,
    queryComponent: PropTypesPlus.isRequiredIf('apiOptions', PropTypesPlus.component),
    willChangeRecord: PropTypes.func
  };
  withInput.defaultProps = {
    apiOptions: false,
    filterParams: Map$1(),
    queryComponent: undefined,
    willChangeRecord: ({
      nextRecord
    }) => nextRecord
  };
  return _compose(withFormDefault, // TODO make function, so that props can be removed
  withForm, withPropMapper(props => ({
    queryComponent: _getOr(props.defaultComponents.query)('queryComponent')(props)
  })) // withPropMapper(props => {
  //   const field = _getOr(props.formField)('field')(props);
  //   return {
  //     disabled: _getOr(props.formDisabled)('disabled')(props),
  //     initialValue: _getOr(field.getValue(props.formInitialValue, { name: props.name }))('initialValue')(props),
  //     readOnly: _getOr(props.formReadOnly)('readOnly')(props),
  //     value: _getOr(field.getValue(props.formValue, { name: props.name }))('value')(props),
  //   };
  // }),
  )(withInput);
}

class Control extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleEvent", event => {
      const action = this.props.action(_objectSpread({
        event
      }, this.getPropsContext()));
      return _isObjectLike(action) && 'meta' in action && 'type' in action ? this.props.setState({
        action: this.props.dispatch(action)
      }) : this.props.onChange({
        target: {
          name: this.props.name,
          value: action
        }
      });
    });
  }

  // TODO add more props
  getPropsContext() {
    return {
      errors: this.props.errors,
      field: this.props.field,
      initialValue: this.props.initialValue,
      processing: this.props.processing,
      processingDidFail: this.props.processingDidFail,
      value: this.props.value
    };
  }

  getProps() {
    return Object.assign({
      [this.props.event]: this.handleEvent,
      disabled: this.props.disabled || this.props.readOnly
    }, _isFunction(this.props.componentProps) ? this.props.componentProps(this.getPropsContext()) : this.props.componentProps);
  } // TODO add index


  render() {
    return React.createElement(this.props.component, this.getProps());
  }

}

Control.propTypes = {
  action: PropTypes.func.isRequired,
  component: PropTypesPlus.component.isRequired,
  event: PropTypes.string
};
Control.defaultProps = {
  event: 'onClick'
};

const mapStateToProps = (state, props) => ({
  processing: !!props.state.action && props.state.action.meta.entity.duck.status(state, _objectSpread({}, props.state.action.meta, {
    status: props.state.action.meta.keyProcessing
  })),
  processDidFail: !!props.state.action && props.state.action.meta.entity.duck.status(state, _objectSpread({}, props.state.action.meta, {
    status: props.state.action.meta.keyProcessingDidFail
  }))
});

var control = _compose(withPropTypes({
  displayName: 'Control',
  propTypes: {}
}), withInput, withFormDefault, withPropMapper(props => ({
  component: props.component || props.defaultComponents.control
})), withState({
  initialState: {
    action: undefined
  }
}), connect(mapStateToProps))(Control);

class Form extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", ({
      target
    }) => {
      if (process.env.NODE_ENV !== 'production') {
        if (target.index === null) throw new Error('entity-form (onChange): index cannot be null');
        if (target.name !== this.props.name) throw new Error(`entity-form (onChange): Name cannot be different from Form name "${this.props.name}"`);
        if (!Map$1.isMap(target.value) && target.value !== null) throw new Error(`entity-form (onChange): Value must either be a "Map" or "null". Refer to form named "${this.props.name}"`);
      } // TODO value can be a list and null


      return this.props.onChange({
        target
      });
    });
  }

  getProps() {
    return {
      formDisabled: this.props.disabled,
      formField: this.props.field,
      formIndex: this.props.index,
      formInitialValue: this.props.initialValue,
      formName: this.props.name,
      formNameMapper: this.props.nameMapper,
      formOnChange: this.handleChange,
      formReadOnly: this.props.readOnly,
      formValue: this.props.value
    };
  }

  render() {
    return React.createElement(FormProvider, this.getProps(), React.createElement(this.props.component, this.props.componentProps, this.props.children));
  }

}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  disabled: PropTypes.bool,
  field: PropTypesEntity.entityField.isRequired,
  initialValue: PropTypesImmutable.map,
  name: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.arrayOf(PropTypes.string.isRequired).isRequired]),
  nameMapper: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypesImmutable.map.isRequired
};
Form.defaultProps = {
  component: 'div',
  componentProps: {},
  disabled: false,
  initialValue: undefined,
  name: undefined,
  nameMapper: {},
  readOnly: false
};

class Input extends React.Component {
  getProps() {
    return Object.assign({
      name: this.props.name,
      onChange: this.props.onChange,
      value: this.props.value
    }, !_isString(this.props.component) && {
      errors: this.props.errors,
      field: this.props.field,
      initialValue: this.props.initialValue,
      onInputChange: this.props.onInputChange,
      options: this.props.options,
      processing: this.props.processing,
      processingDidFail: this.props.processing
    }, _isFunction$1(this.props.componentProps) ? this.props.componentProps(this.props) : this.props.componentProps);
  }

  renderAsComponent(props) {
    const WrapperComponent = this.props.wrapperComponent || React.Fragment;
    return React.createElement(WrapperComponent, this.props.wrapperComponentProps || {}, this.props.many ? this.renderComponentArray(props) : this.renderComponent(props));
  }

  renderComponent(props) {
    return React.createElement(this.props.component, props);
  }

  renderComponentArray(props) {
    return props.value.map((val, index) => React.createElement(this.props.component, _extends({}, props, {
      index: index,
      key: index,
      value: val
    })));
  }

  render() {
    return this.props.children ? this.props.children(this.getProps()) : this.renderAsComponent(this.getProps());
  }

}

Input.propTypes = {
  children: PropTypes.func,
  component: PropTypesPlus.isRequiredIfNot('children', PropTypesPlus.component),
  componentProps: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
  many: PropTypesPlus.notRequiredIf('children', PropTypes.bool),
  // TODO check that field is many
  wrapperComponent: PropTypesPlus.isRequiredIf('wrapperComponentProps', PropTypesPlus.component),
  wrapperComponentProps: PropTypes.shape({})
};
Input.defaultProps = {
  children: undefined,
  component: undefined,
  componentProps: {},
  many: undefined,
  wrapperComponent: undefined,
  wrapperComponentProps: undefined
}; // TODO check withPropTypes

var input = _compose(withPropTypes({
  displayName: 'Input',
  propTypes: exact({
    apiOptions: PropTypes.bool,
    apiValue: PropTypes.bool,
    children: PropTypes.func,
    component: PropTypesPlus.component,
    componentProps: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
    many: PropTypesPlus.notRequiredIf('children', PropTypes.bool),
    name: PropTypesPlus.string,
    type: PropTypes.string,
    willChangeRecord: PropTypes.func,
    wrapperComponent: PropTypesPlus.component,
    wrapperComponentProps: PropTypes.shape({})
  }),
  defaultProps: {
    apiOptions: false,
    apiValue: false,
    children: undefined,
    component: undefined,
    componentProps: {},
    many: undefined,
    name: undefined,
    type: undefined,
    willChangeRecord: ({
      nextRecord
    }) => nextRecord,
    wrapperComponentProps: undefined
  }
}), withInput, withFormDefault, withPropMapper(props => ({
  component: props.component || props.defaultWidgets[props.type || props.field.constructor.type],
  wrapperComponent: props.wrapperComponent || props.defaultComponents.wrapper
})))(Input);

export { control as Control, Form, input as Input, withInput, withForm, withFormDefault, FormConsumer, FormProvider, FormDefaultConsumer, FormDefaultProvider };
//# sourceMappingURL=development.js.map
