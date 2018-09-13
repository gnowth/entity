import _compose from 'lodash/fp/compose';
import PropTypes from 'prop-types';
import React from 'react';

import PropTypesPlus from 'lib/prop-types/Plus';
import { withFormDefault } from './context';
import withInput from './withInput';

class Input extends React.Component {
  getProps() {

  }

  renderAsComponent(props) {
    const renderComponent = this.props.many
      ? this.renderComponentArray
      : this.renderComponent;

    return (
      <this.props.wrapperComponent>
        { renderComponent(props) }
      </this.props.wrapperComponent>
    );
  }

  renderComponent() {
    
  }

  renderComponentArray() {

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
  many: PropTypesPlus.notRequiredIf('children', PropTypes.bool),
};

Input.defaultProps = {
  children: undefined,
  component: undefined,
  many: undefined,
};

export default _compose(
  withFormDefault,
  withInput,
  withPropTypes(props => ({
    defaultProps: {
      component: props.defaultWidgets[props.type || props.field.type],
    },
  })),
)(Input);
