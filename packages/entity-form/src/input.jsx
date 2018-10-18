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

    return (
      <WrapperComponent {...props} {...(this.props.wrapperComponentProps || {})}>
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

  // TODO check if there is an alternative to index as key
  renderComponentArray(props) {
    return props.value.map((val, index) => (
      <this.props.component
        {...props}
        errors={props.field.getErrorsArray(props.errors, { index })}
        index={index}
        key={index} // eslint-disable-line react/no-array-index-key
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
  many: PropTypesPlus.notRequiredIf('children', PropTypes.bool), // TODO check that field is many
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

// TODO check withPropTypes
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
  withDefault(), // TODO find a way to access nested level

  withProps(props => ({
    component: props.component || props.defaults.widgets[props.type || props.field.type],
    wrapperComponent: props.wrapperComponent || props.defaults.label,
  })),
)(Input);
