import _compose from 'lodash/fp/compose';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { withDefault } from '@gnowth/default';
import { withProps, withPropTypes } from '@gnowth/higher-order-component';

import withInput from './withInput';

class Input extends React.Component {
  getProps() {
    return Object.assign(
      {
        name: this.props.name,
        onChange: this.props.onChange,
        value: this.props.value,
      },
      !_isString(this.props.component) && {
        errors: this.props.errors,
        field: this.props.field,
        initialValue: this.props.initialValue,
        onInputChange: this.props.onInputChange,
        options: this.props.options,
        processing: this.props.processing,
        processingDidFail: this.props.processingDidFail,
      },
      _isFunction(this.props.componentProps)
        ? this.props.componentProps(this.props)
        : this.props.componentProps,
    );
  }

  renderAsComponent(props) {
    const WrapperComponent = this.props.wrapperComponent || React.Fragment;
    const wrapperProps = this.props.wrapperComponent
      ? Object.assign({}, props, this.props.wrapperComponentProps)
      : {};

    return (
      <WrapperComponent {...wrapperProps}>
        { this.props.many
          ? this.renderComponentArray(props)
          : this.renderComponent(props)
        }
      </WrapperComponent>
    );
  }

  renderComponent(props) {
    return (
      <this.props.component {...props} />
    );
  }

  renderComponentArray(props) {
    return props.value.map((val, index) => (
      <this.props.component
        {...props}
        errors={props.field.getErrorsArray(props.errors, { index })}
        index={index}
        key={props.field.getId(val) || index}
        value={val}
      />
    ));
  }

  render() {
    return this.props.children
      ? this.props.children(this.getProps())
      : this.renderAsComponent(this.getProps());
  }
}

Input.propTypes = {
  children: PropTypes.func,
  component: PropTypesPlus.isRequiredIfNot('children', PropTypesPlus.component),
  componentProps: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.func,
  ]),
  many: PropTypesPlus.notRequiredIf('children', PropTypes.bool),
  wrapperComponent: PropTypesPlus.isRequiredIf('wrapperComponentProps', PropTypesPlus.component),
  wrapperComponentProps: PropTypes.shape({}),
};

Input.defaultProps = {
  children: undefined,
  component: undefined,
  componentProps: {},
  many: undefined,
  wrapperComponent: undefined,
  wrapperComponentProps: undefined,
};

export default _compose(
  withPropTypes({
    propTypes: exact({
      apiOptions: PropTypes.bool,
      apiValue: PropTypes.bool,
      children: PropTypes.func,
      component: PropTypesPlus.component,
      componentProps: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.func,
      ]),
      many: PropTypesPlus.notRequiredIf('children', PropTypes.bool),
      name: PropTypesPlus.string,
      type: PropTypes.string,
      willChangeRecord: PropTypes.func,
      wrapperComponent: PropTypesPlus.component,
      wrapperComponentProps: PropTypes.shape({}),
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
      willChangeRecord: ({ nextRecord }) => nextRecord,
      wrapperComponentProps: undefined,
    },
  }),

  withInput,
  withDefault(),

  withProps(props => ({
    component: props.component || props.defaults.widgets[props.type || props.field.type],
    wrapperComponent: props.wrapperComponent === null
      ? undefined
      : (props.wrapperComponent || props.defaults.label),
  })),
)(Input);
