import _flowRight from 'lodash/flowRight';
import _isFunction from 'lodash/isFunction';
import _isObjectLike from 'lodash/isObjectLike';
import _isString from 'lodash/isString';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { withDefault } from '@gnowth/default';
import { withState } from '@gnowth/higher-order-component';
import { connect } from 'react-redux';

import withInput from './withInput';

class Control extends React.Component {
  getPropsContext() {
    return {
      errors: this.props.errors,
      field: this.props.field,
      initialValue: this.props.initialValue,
      processing: this.props.processing,
      processingDidFail: this.props.processingDidFail,
      value: this.props.value,
    };
  }

  getProps() {
    return Object.assign(
      {
        [this.props.event]: this.handleEvent,
        disabled: this.props.disabled || this.props.readOnly,
      },

      !_isString(this.props.component) && {
        processing: this.props.processing,
        processingDidFail: this.props.processingDidFail,
      },

      _isFunction(this.props.componentProps)
        ? this.props.componentProps(this.getPropsContext())
        : this.props.componentProps,
    );
  }

  handleEvent = () => {
    const action = this.props.action({ ...this.getPropsContext() });

    return _isObjectLike(action) && 'meta' in action && 'type' in action
      ? this.props.setState({ action: this.props.dispatch(action) })
      : this.props.onChange({
        target: {
          name: this.props.name,
          value: action,
        },
      });
  }

  render() {
    const Component = this.props.component;

    return (
      <Component {...this.getProps()} />
    );
  }
}

Control.propTypes = {
  action: PropTypes.func.isRequired,
  component: PropTypesPlus.component.isRequired,
  componentProps: PropTypes.shape({}),
  disabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  errors: PropTypesImmutable.list.isRequired,
  event: PropTypes.string,
  field: PropTypesEntity.entityField.isRequired,
  initialValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  name: PropTypesPlus.string,
  onChange: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
  processingDidFail: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool,
  setState: PropTypes.func.isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

Control.defaultProps = {
  componentProps: {},
  disabled: undefined,
  event: 'onClick',
  initialValue: undefined,
  name: undefined,
  readOnly: undefined,
  value: undefined,
};

const mapStateToProps = (state, props) => ({
  processing: !!props.state.action
    && props.state.action.meta.entity.duck.status(state, {
      ...props.state.action.meta,
      status: props.state.action.meta.keyProcessing,
    }),

  processingDidFail: !!props.state.action
    && props.state.action.meta.entity.duck.status(state, {
      ...props.state.action.meta,
      status: props.state.action.meta.keyProcessingDidFail,
    }),
});

export default _flowRight(
  withInput,
  withDefault({
    component: ['entityForm_button', 'component_button'],
  }),
  withState({ initialState: { action: undefined } }),
  connect(mapStateToProps),
)(Control);
