import React from 'react';
import PropTypes from 'prop-types';

import SDAux from 'lib/components/std/SDAux';
// import { PropTypesEntity } from '../entity-form';

import { Consumer } from './context';
import SC from './styles';

class InputArray extends React.Component {
  handleChange = (context, index) => ({ target: { value } }) => (
    context.onChange({
      target: {
        name: this.props.name,
        value: context.record.get(this.props.name).set(index, value),
      },
    })
  );

  renderFromContext(context) {
    const Component = this.props.widget || context.field.defaultWidget;

    // TODO check that value is an array
    return (
      <SDAux>
        { context.record.get(this.props.name) &&
          context.record.get(this.props.name).map((value, index) => (
            <Component
              key={index}
              name={this.props.name}
              value={value}
              records={context.record.get(this.props.name)}
              onChange={this.handleChange(context, index)}
              {...this.props.widgetProps}
              nested="true"
            />
          ))
        }

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
            label
          </SC.Label>
        }

        { /* TODO think about bind */}
        <Consumer>{this.renderFromContext.bind(this)}</Consumer>
      </SC.Container>
    );
  }
}

InputArray.propTypes = {
  name: PropTypes.string.isRequired,
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

InputArray.defaultProps = {
  widget: undefined,
  widgetProps: {},
  containerClassName: undefined,
  labelClassName: undefined,
  labelHidden: false,
  errorClassName: undefined,
  errorHidden: false,
};

export default InputArray;
