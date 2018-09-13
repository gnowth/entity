import _isObjectLike from 'lodash/fp/isObjectLike';
import _isString from 'lodash/fp/isString';
import _compose from 'lodash/fp/compose';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PropTypesDuck from 'lib/prop-types/Duck';
import withState from 'lib/higher-order-component/withState';

import { ArrayConsumer } from './components/base';
import withNameMapper from './components/withNameMapper';
import Context from './components/context';

// TODO check that name is undefined if array is true
class Control extends React.Component {
  handleEventFactory = context => (event) => {
    const action = this.props.action({ event, ...context });
    const handleChange = this.props.array ? context.onArrayChange : context.onChange;

    if (_isObjectLike(action) && 'meta' in action && 'type' in action) {
      this.props.setState({ action });

      return this.props.dispatch(action);
    }

    return handleChange({
      target: {
        value: action,
        name: context.name,
      },
    });
  };

  renderFromContext(context) {
    const Component = this.props.component;

    const props = Object.assign(
      {
        [this.props.event]: this.handleEventFactory(context),
        disabled: this.props.processing || context.disabled,
        readOnly: context.readOnly,
      },

      !_isString(Component) && {
        processing: this.props.processing,
        processDidFail: this.props.processDidFail,
      },

      this.props.componentProps,
    );

    return <Component {...props} />;
  }

  render() {
    if (this.props.hidden) return null;

    const ContextComponent = this.props.array ? ArrayConsumer : Context;

    return (
      <ContextComponent {...this.props}>
        {this.renderFromContext.bind(this)}
      </ContextComponent>
    );
  }
}

Control.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  array: PropTypes.bool,

  // action
  action: PropTypes.func.isRequired,
  event: PropTypes.string,
  dispatch: PropTypes.func.isRequired,

  // component
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]).isRequired,
  componentProps: PropTypes.shape({
    className: PropTypes.string,
  }),

  // state
  state: PropTypes.shape({
    action: PropTypes.shape({
      payload: PropTypes.any,
      meta: PropTypes.shape({
        entity: PropTypesDuck.entity.isRequired,
      }),
    }),
  }).isRequired,
  setState: PropTypes.func.isRequired,

  // status
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  hidden: PropTypes.bool,

  // status action
  processing: PropTypes.bool.isRequired,
  processDidFail: PropTypes.bool.isRequired,
};

Control.defaultProps = {
  name: undefined,
  array: false,
  event: 'onClick',
  componentProps: {},

  // status
  disabled: undefined,
  readOnly: undefined,
  hidden: undefined,
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
  withNameMapper,
  withState({ initialState: { action: undefined } }),
  connect(mapStateToProps),
)(Control);
