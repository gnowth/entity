import _compose from 'lodash/fp/compose';
import _getOr from 'lodash/fp/getOr';
// import _pick from 'lodash/fp/pick';
import React from 'react';
import { List } from 'immutable';

import withPropMapper from 'lib/higher-order-component/withPropMapper';
import PropTypesPlus from 'lib/prop-types/Plus';

import { withForm, withFormDefault } from './context';

export default function (ComposedComponent) {
  class withFormContext extends React.Component {
    getProps() {
      return Object.assign(
        {
          disabled: this.props.disabled,
          name: this.props.name || this.props.formName,
          onChange: this.props.formOnChange,
          readOnly: this.props.readOnly,
          value: this.props.formField.getValue(this.props.formValue, { name: this.props.name }),
        },

        !this.props.stripExtraProps && {
          field: this.props.formField.getField({ name: this.props.name }),
          initialValue: this.props.formInitialValue,
          options: List(),
        },
      );
    }

    renderQuery(props) {
      return (
        <this.props.queryComponent
          action={this.props.field.entity.duck.get({
            params: this.props.filterParams,
          })}
        >
          { query => this.renderComponent(context, {
            ...extra,
            onInputChange: container.onInputChange,
            processing: extra.processing || container.processing,
            processDidFail: extra.processing || container.processDidFail,
            options: container.value,
          })}
        </this.props.queryComponent>
      );
    }

    render() {
      if (process.env.NODE_ENV !== 'production') {
        if (name !== this.props.name) throw new Error(`entity-form (onChange with useValueChange): updating another field "${name}" is not supported. Can only update "${this.props.name}"`);
      }

      return <ComposedComponent {...this.getProps()} />;
    }
  }

  withFormContext.propTypes = {
    queryComponent: PropTypesPlus.isRequiredIf('', PropTypesPlus.component.isRequired),
  };

  withFormContext.defaultProps = {
    queryComponent: undefined,
  };

  return _compose(
    withFormDefault,
    withForm,

    withPropMapper(props => ({
      queryComponent: _getOr(props.defaultComponents.query)('queryComponent')(props),
    })),
    // withPropMapper(props => {
    //   const field = _getOr(props.formField)('field')(props);

    //   return {
    //     disabled: _getOr(props.formDisabled)('disabled')(props),
    //     initialValue: _getOr(field.getValue(props.formInitialValue, { name: props.name }))('initialValue')(props),
    //     readOnly: _getOr(props.formReadOnly)('readOnly')(props),
    //     value: _getOr(field.getValue(props.formValue, { name: props.name }))('value')(props),
    //   };
    // }),
  )(withFormContext);
}
