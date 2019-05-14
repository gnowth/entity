import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { withDefault } from '@burnsred/default';
import { is } from 'immutable';

import OptionText from './option-text';

const ListComponent = styled.ul`
  list-style-type: none;
  ${props => props.css}
`;

class WidgetList extends React.Component {
  handleClickFactory = option => () => {
    if (this.props.readOnly || this.props.disabled) return undefined;

    if (this.props.field.many) {
      return this.props.onChange({
        target: {
          name: this.props.name,
          value: this.props.value.includes(option)
            ? this.props.value.filterNot(val => is(val, option))
            : this.props.value.push(option),
        },
      });
    }

    return this.props.onChange({
      target: {
        name: this.props.name,
        value: is(option, this.props.value) ? null : option,
      },
    });
  }

  getPropsOption(option) {
    const props = {
      disabled: this.props.disabled,
      field: this.props.field,
      readOnly: this.props.readOnly,
      selected: this.props.field.many
        ? this.props.value.includes(option)
        : is(option, this.props.value),
      value: option,
    };

    return Object.assign(
      { onClick: this.handleClickFactory(option) },
      props,
      _.isString(this.props.optionComponent) && { field: undefined },
      _.isFunction(this.props.optionComponentProps)
        ? this.props.optionComponentProps(props)
        : this.props.optionComponentProps,
    );
  }

  getShouldShow() {
    return {
      options: !this.props.processing
        && !this.props.processingDidFail
        && this.props.options,

      processingComponent: this.props.processing
        && this.props.processingComponent,

      processingDidFailComponent: this.props.processingDidFail
        && this.props.processingDidFailComponent,

      recordCountNoneComponent: !this.props.processing
        && !this.props.processingDidFail
        && this.props.recordCountNoneComponent
        && this.props.options
        && this.props.options.size === 0,
    };
  }

  render() {
    const shouldShow = this.getShouldShow();
    const Component = this.props.component;
    const OptionComponent = this.props.optionComponent;
    const ProcessingComponent = this.props.processingComponent;
    const ProcessingDidFailComponent = this.props.processingDidFailComponent;
    const RecordCountNoneComponent = this.props.recordCountNoneComponent;

    return (
      <Component {...this.props.componentProps}>
        { shouldShow.processingComponent && (
          <ProcessingComponent {...(this.props.processingComponentProps || {})} />
        )}

        { shouldShow.processingDidFailComponent && (
          <ProcessingDidFailComponent {...(this.props.processingDidFailComponentProps || {})} />
        )}

        { shouldShow.recordCoundNoneComponent && (
          <RecordCountNoneComponent {...(this.props.recordCountNoneComponentProps || {})} />
        )}

        { shouldShow.options && this.props.options.map(option => (
          <OptionComponent
            key={this.props.field.getKey(option)}
            {...this.getPropsOption(option)}
          />
        ))}
      </Component>
    );
  }
}

WidgetList.propTypes = {
  component: PropTypesPlus.component,
  componentProps: PropTypes.shape({}),
  disabled: PropTypes.bool,
  field: PropTypesEntity.field.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypesImmutable.list,
  optionComponent: PropTypesPlus.component,
  optionComponentProps: PropTypesPlus.componentProps,
  processing: PropTypes.bool,
  processingComponent: PropTypesPlus.isRequiredIf('processingComponentProps', PropTypesPlus.component),
  processingComponentProps: PropTypes.shape({}),
  processingDidFail: PropTypes.bool,
  processingDidFailComponent: PropTypesPlus.isRequiredIf('processingDidFailComponentProps', PropTypesPlus.component),
  processingDidFailComponentProps: PropTypes.shape({}),
  recordCountNoneComponent: PropTypesPlus.isRequiredIf('recordCountNoneComponentProps', PropTypesPlus.component),
  recordCountNoneComponentProps: PropTypes.shape({}),
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypesImmutable.map,
    PropTypesImmutable.list,
  ]),
};

WidgetList.defaultProps = {
  component: ListComponent,
  componentProps: {},
  disabled: false,
  options: undefined,
  optionComponent: OptionText,
  optionComponentProps: {},
  processing: false,
  processingComponent: undefined,
  processingComponentProps: undefined,
  processingDidFail: false,
  processingDidFailComponent: undefined,
  processingDidFailComponentProps: undefined,
  recordCountNoneComponent: undefined,
  recordCountNoneComponentProps: undefined,
  readOnly: false,
  value: undefined,
};

export default withDefault({
  processingComponent: ['entityWidget_processing', 'component_processing'],
  processingDidFailComponent: ['entityWidget_processingDidFail', 'component_processingDidFail'],
  recordCountNoneComponent: ['entityWidget_recordCountNone', 'component_recordCountNone'],
})(WidgetList);
