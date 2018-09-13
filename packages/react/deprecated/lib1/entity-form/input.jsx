import React from 'react';
import PropTypes from 'prop-types';

import SDAux from 'lib/components/std/SDAux';
// import { PropTypesEntity } from '../entity-form';

import { Consumer } from './context';
import SC from './styles';


// TODO need to add field to component
class Input extends React.Component {
  renderFromContext(context) {
    const Component = this.props.widget || context.field.defaultWidget;

    return (
      <SDAux>
        <Component
          name={this.props.name}
          value={context.record.get(this.props.name)}
          record={context.record}
          onChange={context.onChange}
          {...this.props.widgetProps}
          nested="true"
        />

        { !this.props.errorHidden &&
          context.errors.some(error => error.fieldName === this.props.name) &&
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
            { this.props.label || this.props.name }
          </SC.Label>
        }

        { /* TODO think about bind */ }
        <Consumer>{ this.renderFromContext.bind(this) }</Consumer>
      </SC.Container>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  widget: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  widgetProps: PropTypes.shape({}),

  containerClassName: PropTypes.string,

  labelClassName: PropTypes.string,
  labelHidden: PropTypes.bool,

  errorClassName: PropTypes.string,
  errorHidden: PropTypes.bool,
};

Input.defaultProps = {
  widget: undefined,
  widgetProps: {},
  containerClassName: undefined,
  label: undefined,
  labelClassName: undefined,
  labelHidden: false,
  errorClassName: undefined,
  errorHidden: false,
};

export default Input;
