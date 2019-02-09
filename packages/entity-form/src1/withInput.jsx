import _flowRight from 'lodash/flowRight';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { withDefault } from '@gnowth/default';
import { Map } from 'immutable';

import { withForm } from './context';

export default function (ComposedComponent) {
  class withInput extends React.Component {
    state = {
      valueInput: '',
    }

    handleChange = ({ target }) => {
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

    handleChangeArray = ({ target }) => this.props.formOnChange({
      target: {
        array: true,
        name: this.props.formName,
        value: target.value,
      },
    })

    handleChangeInput = valueInput => this.setState({ valueInput })

    getProps() {
      const field = this.props.formField.getField({ name: this.props.name });

      return Object.assign({}, this.props, {
        field,
        disabled: this.props.disabled,
        errors: this.props.formField.getErrors(this.props.formErrors, { name: this.props.name }),
        index: this.props.index,
        name: this.props.name,
        onChange: this.props.array
          ? this.handleChangeArray
          : this.handleChange,
        readOnly: this.props.readOnly,
        options: field.getOptions(),
        value: this.props.formField.getValue(this.props.formValue, { name: this.props.name }),
        valueInitial: this.props.formValueInitial,
      });
    }

    renderComponent(props) {
      return <ComposedComponent {...props} />;
    }

    renderQuery(props) {
      const QueryComponent = this.props.queryComponent;

      return (
        <QueryComponent
          action={props.field.entity.duck.actions.get({
            params: Map({ search: this.state.valueInput }).merge(this.props.filterParams),
          })}
        >
          { query => this.renderComponent({
            ...props,
            onInputChange: this.handleChangeInput,
            processing: query.processing,
            processingDidFail: query.processingDidFail,
            options: query.value,
          })}
        </QueryComponent>
      );
    }

    render() {
      return this.props.loadOptionsFromAPI
        ? this.renderQuery(this.getProps())
        : this.renderComponent(this.getProps());
    }
  }

  withInput.propTypes = {
    loadOptionsFromAPI: PropTypes.bool,
    array: PropTypes.bool,
    disabled: PropTypes.bool,
    filterParams: PropTypesImmutable.map,
    formErrors: PropTypesImmutable.list.isRequired,
    formField: PropTypesEntity.entityField.isRequired,
    formOnChange: PropTypes.func.isRequired,
    formIndex: PropTypes.number,
    formName: PropTypesPlus.string,
    formValue: PropTypesImmutable.map.isRequired,
    formValueInitial: PropTypesImmutable.map,
    index: PropTypes.number,
    name: PropTypesPlus.string,
    queryComponent: PropTypesPlus.isRequiredIf('loadOptionsFromAPI', PropTypesPlus.component),
    readOnly: PropTypes.bool,
    willChangeRecord: PropTypes.func,
  };

  withInput.defaultProps = {
    loadOptionsFromAPI: false,
    array: false,
    disabled: undefined,
    filterParams: Map(),
    formIndex: undefined,
    formName: undefined,
    formValueInitial: undefined,
    index: undefined,
    name: undefined,
    queryComponent: undefined,
    readOnly: undefined,
    willChangeRecord: ({ nextRecord }) => nextRecord,
  };

  return _flowRight(
    withForm,
    withDefault({ queryComponent: ['entityForm_query', 'component_query'] }),
  )(withInput);
}
