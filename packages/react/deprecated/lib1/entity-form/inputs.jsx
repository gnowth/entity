import React from 'react';
import PropTypes from 'prop-types';

import SDAux from 'lib/components/std/SDAux';
// import { PropTypesEntity } from '../entity-form';

import { Consumer } from './context';
import SC from './styles';

class Inputs extends React.Component {
  renderFromContext(context) {
    const Component = this.props.widget || context.field.defaultWidget;

    return (
      <SDAux>
        <Component
          names={this.props.names}
          value={context.record.filter((value, key) => this.props.names.includes(key))}
          record={context.record}
          onChange={context.onChange}
          {...this.props.widgetProps}
          nested="true"
        />

        { !this.props.errorHidden &&
          context.errors.some(error => this.props.names.includes(error.fieldName)) &&
          <SC.Error className={this.props.errorClassName}>
            error
          </SC.Error>
        }
      </SDAux>
    );
  }

  render() {
    return (
      <SC.Container className={this.props.containerClassName}>
        { !this.props.labelHidden &&
          <SC.Label className={this.props.labelClassName}>
            label
          </SC.Label>
        }

        { /* TODO think about bind */}
        <Consumer>{ this.renderFromContext.bind(this) }</Consumer>
      </SC.Container>
    );
  }
}

Inputs.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  widget: PropTypes.func,
  widgetProps: PropTypes.shape({}),

  containerClassName: PropTypes.string,

  labelClassName: PropTypes.string,
  labelHidden: PropTypes.bool,

  errorClassName: PropTypes.string,
  errorHidden: PropTypes.bool,
};

Inputs.defaultProps = {
  widget: undefined,
  widgetProps: {},
  containerClassName: undefined,
  labelClassName: undefined,
  labelHidden: false,
  errorClassName: undefined,
  errorHidden: false,
};

export default Inputs;
