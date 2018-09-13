import _compose from 'lodash/fp/compose';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import React from 'react';

import PropTypesForm from 'lib/prop-types/Form';
import PropTypesPlus from 'lib/prop-types/Plus';
import withPropMapper from 'lib/higher-order-component/withPropMapper';
import withPropTypes from 'lib/higher-order-component/withPropTypes';

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
  willChangeRecord: PropTypes.func,
};

Input.defaultProps = {
  children: undefined,
  component: undefined,
  many: undefined,
  willChangeRecord: ({ nextRecord }) => nextRecord,
};

export default _compose(
  withPropTypes({
    propTypes: exact({
      children: PropTypes.func,
      component: PropTypesPlus.component,
      componentProps: PropTypes.shape({}),
      many: PropTypesPlus.notRequiredIf('children', PropTypes.bool),
      name: PropTypesForm.name,
      willChangeRecord: PropTypes.func,
    }),

    defaultProps: {
      children: undefined,
      component: undefined,
      componentProps: {},
      many: undefined,
      name: undefined,
      willChangeRecord: ({ nextRecord }) => nextRecord,
    },
  }),

  withFormDefault,
  withInput,

  withPropMapper(props => ({
    component: props.defaultWidgets[props.type || props.field.type],
  })),
)(Input);
