import React from 'react';
import PropTypes from 'prop-types';

import { Consumer } from './context';

class ControlForm extends React.Component {
  renderFromContext(context) {
    const Component = this.props.widget;
    const widgetProps = Object.assign({}, this.props.widgetProps, {
      [this.props.event]: event => context.onRecordChange({
        target: {
          value: this.props.action(context.field.entity).call(
            context.field.entity,
            context.record,
            { event, ...this.props.actionOptions },
          ),
        },
      }),
    });

    return (
      <Component {...widgetProps} />
    );
  }

  render() {
    return (
      <Consumer>{this.renderFromContext.bind(this)}</Consumer>
    );
  }
}

ControlForm.propTypes = {
  event: PropTypes.string,

  action: PropTypes.func.isRequired,
  actionOptions: PropTypes.shape({}),

  widget: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
  widgetProps: PropTypes.shape({}),
};

ControlForm.defaultProps = {
  event: 'onClick',
  actionOptions: {},
  widgetProps: {},
};

export default ControlForm;
