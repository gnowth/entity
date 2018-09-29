import _compose from 'lodash/fp/compose';
import _isFunction from 'lodash/isFunction';
import _isObjectLike from 'lodash/isObjectLike';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { withDefault } from '@gnowth/default';
import { withProps, withState } from '@gnowth/higher-order-component';
import { connect } from 'react-redux';

import withInput from './withInput';

class Control extends React.Component {
  // TODO add more props
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
        processing: this.props.processing,
        processDidFail: this.props.processDidFail,
      },
      _isFunction(this.props.componentProps)
        ? this.props.componentProps(this.getPropsContext())
        : this.props.componentProps,
    );
  }

  // TODO add index
  handleEvent = (event) => {
    const action = this.props.action({ event, ...this.getPropsContext() });

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
    return (
      <this.props.component {...this.getProps()} />
    );
  }
}

Control.propTypes = {
  action: PropTypes.func.isRequired,
  component: PropTypesPlus.component.isRequired,
  event: PropTypes.string,
};

Control.defaultProps = {
  event: 'onClick',
};

const mapStateToProps = (state, props) => ({
  processing: !!props.state.action
    && props.state.action.meta.entity.duck.status(state, {
      ...props.state.action.meta,
      status: props.state.action.meta.keyProcessing,
    }),

  processDidFail: !!props.state.action
    && props.state.action.meta.entity.duck.status(state, {
      ...props.state.action.meta,
      status: props.state.action.meta.keyProcessingDidFail,
    }),
});

export default _compose(
  withInput,
  withDefault(),

  withProps(props => ({
    component: props.component || props.defaults.button,
  })),

  withState({ initialState: { action: undefined } }),
  connect(mapStateToProps),
)(Control);
