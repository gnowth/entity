import _compose from 'lodash/fp/compose';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { withDefault } from '@gnowth/default';
import { withProps } from '@gnowth/higher-order-component';
import { List, Map } from 'immutable';

import { withForm } from './context';

// TODO use options input to load option?
export default function (ComposedComponent) {
  class withInput extends React.Component {
    getProps() {
      return Object.assign({}, this.props, {
        disabled: this.props.disabled,
        index: this.props.index,
        name: this.props.name || this.props.formName,
        onChange: this.handleChange,
        readOnly: this.props.readOnly,
        value: this.props.formField.getValue(this.props.formValue, { name: this.props.name }),
        field: this.props.formField.getField({ name: this.props.name }),
        initialValue: this.props.formInitialValue,
        options: List(),
      });
    }

    handleChange = ({ target }) => {
      // TODO check that if name is not define, then index cannot be defined
      const index = target.getAttribute
        ? target.getAttribute('index') || undefined
        : target.index;

      const props = this.getProps();

      const nextValue = this.props.willChangeRecord({
        value: props.value,
        field: props.field,
        nextRecord: target.name
          ? this.props.formValue.setIn(
            index === undefined ? [target.name] : [target.name, index],
            props.field.clean(target.value),
          )
          : this.props.formValue.merge(target.value),
        nextValue: target.value,
        record: this.props.formValue,
      });

      return this.props.formOnChange({
        target: {
          index: this.props.formIndex,
          name: this.props.formName,
          value: nextValue,
        },
      });
    }

    renderComponent(props) {
      return <ComposedComponent {...props} />;
    }

    renderQuery(props) {
      return (
        <this.props.queryComponent
          action={({ search }) => props.field.entity.duck.get({
            params: Map({ search }).merge(this.props.filterParams),
          })}
        >
          { query => this.renderComponent({
            ...props,
            onInputChange: query.onInputChange,
            processing: query.processing,
            processingDidFail: query.processingDidFail,
            options: query.value,
          })}
        </this.props.queryComponent>
      );
    }

    render() {
      // if (process.env.NODE_ENV !== 'production') {
      //   if (name !== this.props.name) throw new Error(`entity-form (onChange with useValueChange): updating another field "${name}" is not supported. Can only update "${this.props.name}"`);
      // }
      return this.props.apiOptions
        ? this.renderQuery(this.getProps())
        : this.renderComponent(this.getProps());
    }
  }

  withInput.propTypes = {
    apiOptions: PropTypes.bool,
    filterParams: PropTypesImmutable.map,
    formField: PropTypesEntity.entityField.isRequired,
    queryComponent: PropTypesPlus.isRequiredIf('apiOptions', PropTypesPlus.component),
    willChangeRecord: PropTypes.func,
  };

  withInput.defaultProps = {
    apiOptions: false,
    filterParams: Map(),
    queryComponent: undefined,
    willChangeRecord: ({ nextRecord }) => nextRecord,
  };

  return _compose(
    withDefault(), // TODO make function, so that props can be removed
    withForm,

    withProps(props => ({
      queryComponent: props.queryComponent || props.defaults.query,
    })),
    // withProps(props => {
    //   const field = _getOr(props.formField)('field')(props);

    //   return {
    //     disabled: _getOr(props.formDisabled)('disabled')(props),
    //     initialValue: _getOr(field.getValue(props.formInitialValue, { name: props.name }))('initialValue')(props),
    //     readOnly: _getOr(props.formReadOnly)('readOnly')(props),
    //     value: _getOr(field.getValue(props.formValue, { name: props.name }))('value')(props),
    //   };
    // }),
  )(withInput);
}
