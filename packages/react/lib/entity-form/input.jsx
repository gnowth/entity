import _isFunction from 'lodash/fp/isFunction';
import _isString from 'lodash/fp/isString';
import _omit from 'lodash/fp/omit';
import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { ArrayProvider, FormConsumer } from './components/base';
import Label from './components/Label';
import WrapperInput from './components/WrapperInput';
import Context from './components/context';
import withNameMapper from './components/withNameMapper';

class Input extends React.Component {
  getLabelProps(context, LabelComponent) {
    return Object.assign(
      {
        disabled: this.props.disabled === undefined
          ? context.disabled
          : this.props.disabled,

        readOnly: this.props.readOnly === undefined
          ? context.readOnly
          : this.props.readOnly,
      },

      !_isString(LabelComponent) && {
        inline: this.props.labelInline,
        reverse: this.props.labelReverse,
        required: this.props.labelRequired === undefined
          ? !context.field.blank
          : this.props.labelRequired,
      },

      this.props.labelComponentProps,
    );
  }

  getArrayProps(context, value, index, Component) {
    return Object.assign(
      {},
      _isString(Component)
        ? _omit([
          'defaultValue',
          'record',
          'field',
          'options',
          'errors',
          'processing',
          'processDidFail',
          'onInputChange',
        ])(context)
        : context,

      {
        value,
        onChange: this.handleManyChangeFactory(context, index),
      },

      !_isString(Component) && {
        index,
        defaultValue: context.defaultValue && context.defaultValue.get(index),
        onArrayChange: this.handleManyArrayChangeFactory(context),
        records: context.value,
        errors: context.errors
          .filter(error => error.get('listError'))
          .flatMap(error => error.getIn(['errors', index])),
      },

      _isFunction(this.props.componentProps)
        ? this.props.componentProps(Object.assign({}, context, {
          index,
          value,
          records: context.value,
        }))
        : this.props.componentProps,
    );
  }

  // TODO implement handleChangeFactory for useValueChange
  // TODO check that name is a string if many is true
  handleManyChangeFactory = (context, index) => ({ target: { value } }) => (
    context.onChange({
      target: {
        name: this.props.name,
        value: context.value.set(index, value),
      },
    })
  );

  handleManyArrayChangeFactory = context => ({ target: { value, name } }) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!List.isList(value) && value !== null) throw new Error(`The value of onArrayChange must either be a "List" or "null". Refer to form named "${this.props.name}"`);
      if (name !== this.props.name) throw new Error(`entity-form input(handleManyArrayChangeFactory): name "${name}" from target must be the same as props.name "${this.props.name}"`);
    }

    return context.onChange({
      target: {
        value,
        name: this.props.name,
      },
    });
  };

  renderComponentArray = (context, defaults) => {
    const Component = this.props.component || defaults[context.field.constructor.type];

    if (process.env.NODE_ENV !== 'production') {
      if (!Component) throw new Error(`"component" is required for InputArray with name(s) ${this.props.name}`);
    }

    return context.value.map((value, index) => (
      <ArrayProvider
        key={context.field.entity.getId(value) || index}
        value={this.getArrayProps(context, value, index, Component)}
      >
        <Component {...this.getArrayProps(context, value, index, Component)} />
      </ArrayProvider>
    ));
  }

  renderComponent = (context, defaults) => {
    const Component = this.props.component || defaults[context.field.constructor.type];

    if (process.env.NODE_ENV !== 'production') {
      if (!Component) throw new Error(`"component" is required for Input with name(s) ${this.props.name}`);
    }

    const props = Object.assign(
      {},

      _isString(Component)
        ? _omit([
          'defaultValue',
          'record',
          'field',
          'options',
          'errors',
          'mapProps',
          'processing',
          'processDidFail',
          'onInputChange',
        ])(context)
        : context,

      _isFunction(this.props.componentProps)
        ? this.props.componentProps(context)
        : this.props.componentProps,
    );

    return <Component {...props} />;
  }

  renderAsChildren(context) {
    return this.props.children(context);
  }

  // TODO add process same as ContainerApi
  // TODO check if many is set, then field must be many and name must be string
  renderAsComponent(context) {
    const LabelComponent = this.props.labelComponent;
    const InputComponent = this.props.inputComponent;
    const renderComponent = this.props.many
      ? this.renderComponentArray
      : this.renderComponent;

    return (
      <InputComponent
        className={this.props.className}
        inline={this.props.labelInline}
        reverse={this.props.labelReverse}
      >
        { this.props.label && !this.props.labelHidden && (
          <LabelComponent {...this.getLabelProps(context, LabelComponent)}>
            {this.props.label}
          </LabelComponent>
        )}

        <FormConsumer>
          { defaults => renderComponent(context, defaults.defaultWidgets) }
        </FormConsumer>
      </InputComponent>
    );
  }

  render() {
    return (
      <Context {...this.props}>
        {(context) => {
          const hidden = _isFunction(this.props.hidden)
            ? this.props.hidden(context)
            : this.props.hidden;

          if (hidden) return null;

          return this.props.children
            ? this.renderAsChildren(context)
            : this.renderAsComponent(context);
        }}
      </Context>
    );
  }
}

Input.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  children: PropTypes.func,

  // value
  useValueChange: PropTypes.bool,

  // status
  disabled: PropTypes.bool,
  hidden: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  readOnly: PropTypes.bool,

  // component
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),
  componentProps: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.func,
  ]),

  // label
  label: PropTypes.string,
  labelHidden: PropTypes.bool,
  labelComponent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),
  labelComponentProps: PropTypes.shape({}),
  labelInline: PropTypes.bool,
  labelReverse: PropTypes.bool,
  labelRequired: PropTypes.bool,

  // input
  inputComponent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),

  many: PropTypes.bool,
};

Input.defaultProps = {
  name: undefined,
  children: undefined,
  component: undefined,
  componentProps: {},

  // feature trigger
  useValueChange: false,
  many: false,

  // status
  hidden: false,
  disabled: undefined,
  readOnly: undefined,

  // label
  label: undefined,
  labelHidden: false,
  labelComponent: Label,
  labelComponentProps: {},
  labelInline: undefined,
  labelReverse: undefined,
  labelRequired: undefined,

  // input
  inputComponent: WrapperInput,
};

export default withNameMapper(Input);
