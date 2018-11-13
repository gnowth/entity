import _isString from 'lodash/isString';
import React from 'react';
import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import { UITypeSet } from '@gnowth/ui';
import { is, List } from 'immutable';

import * as SC from './styles';

const WidgetEntityList = ({
  processingComponent: ProcessingComponent,
  recordsCountNoneComponent: RecordsCountNoneComponent,
  listComponent: ListComponent,
  optionComponent: OptionComponent,
  ...props
}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (props.field.many && !List.isList(props.value)) throw new Error(`WidgetEntityList: 'value' for widget name ${props.name} must be a "List" if field.many is true`);
  }

  const otherProps = _isString(OptionComponent) ? {} : {
    field: props.field,
    record: props.record,
    records: props.options,
  };

  const clearable = props.clearable === undefined ? props.field.blank : props.clearable;

  return (
    <React.Fragment>
      { props.processing && (
        <ProcessingComponent {...props.processingComponentProps} />
      )}

      { !props.processing && props.options && props.options.size === 0 && (
        <RecordsCountNoneComponent {...props.recordsCountNoneComponentProps} />
      )}

      { !props.processing && props.options && props.options.size > 0 && (
        <ListComponent
          className={props.className}
          readOnly={props.readOnly}
          disabled={props.disabled}
          {...props.listComponentProps}
        >
          { props.options.map((record, index) => (
            <OptionComponent
              key={props.field.entity.getId(record) || index}
              name={props.name}
              value={record}
              onClick={() => !props.readOnly && props.onChange({ target: {
                name: props.name,
                value: props.field.many // eslint-disable-line no-nested-ternary
                  ? (
                    props.value.includes(record) // eslint-disable-line no-nested-ternary
                      ? (!clearable && props.value.size === 1 ? props.value : props.value.filterNot(val => val.equals(record)))
                      : props.value.push(record)
                  )
                  : (record.equals(props.value) ? (clearable ? null : record) : record), // eslint-disable-line no-nested-ternary
              } })}
              selected={props.field.many
                ? props.value.includes(record)
                : is(record, props.value)
              }
              onChange={x => x}
              readOnly={props.readOnly}
              disabled={props.disabled}
              {...otherProps}
              {...props.optionComponentProps}
            >
              { !props.labelHidden && props.labelRenderer({ value: record, field: props.field, index }) }
            </OptionComponent>
          ))}
        </ListComponent>
      )}
    </React.Fragment>
  );
};

WidgetEntityList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypesImmutable.map,
    PropTypesImmutable.list.isRequired,
  ]),
  onChange: PropTypes.func.isRequired,
  record: PropTypesImmutable.map.isRequired,
  field: PropTypesEntity.entityField.isRequired,
  options: PropTypesImmutable.list,
  classNameSelected: PropTypes.string,
  recordsCountNoneComponent: PropTypes.func,
  recordsCountNoneComponentProps: PropTypes.shape({}),

  listComponent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),
  listComponentProps: PropTypes.shape({}),
  optionComponent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),
  optionComponentProps: PropTypes.shape({}),

  processing: PropTypes.bool,
  processingComponentProps: PropTypes.shape({}),
  processingComponent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),

  labelRenderer: PropTypes.func,
  labelHidden: PropTypes.bool,

  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
};

WidgetEntityList.defaultProps = {
  value: null,
  options: List(),
  classNameSelected: '',
  optionComponent: props => <UITypeSet component="li" {...props} variant="list" />, // eslint-disable-line react/display-name
  optionComponentProps: {},
  processingComponentProps: {},
  processingComponent: () => (<div>Loading ...</div>), // eslint-disable-line react/display-name
  recordsCountNoneComponent: () => (<div>No records found.</div>), // eslint-disable-line react/display-name
  recordsCountNoneComponentProps: {},
  processing: false,
  listComponent: SC.ListComponent,
  listComponentProps: {},
  labelHidden: false,
  labelRenderer: ({ value, field }) => field.entity.toString(value),
  readOnly: false,
  disabled: false,
  clearable: undefined,
};

export default WidgetEntityList;
