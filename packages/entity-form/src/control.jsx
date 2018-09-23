import _compose from 'lodash/fp/compose';
import _isFunction from 'lodash/fp/isFunction';
import _isObjectLike from 'lodash/fp/isObjectLike';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { connect } from 'react-redux';
import { withPropMapper, withPropTypes, withState } from '@gnowth/higher-order-component';

import { withFormDefault } from './context';
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
  withPropTypes({
    displayName: 'Control',

    propTypes: {

    },
  }),

  withInput,
  withFormDefault,

  withPropMapper(props => ({
    component: props.component || props.defaultComponents.control,
  })),

  withState({ initialState: { action: undefined } }),
  connect(mapStateToProps),
)(Control);
