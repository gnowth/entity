import _isString from 'lodash/fp/isString';
import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map } from 'immutable';

import { ContainerApi } from 'lib/entity-duck';

import { Consumer } from './base';

class Context extends React.Component {
  getErrors(context) {
    return Array.isArray(this.props.name)
      ? context.entityErrors.map(
        error => Map({
          entityError: true,
          errors: context.field.getValue(
            error.get('errors'),
            { name: this.props.name },
          ),
        }),
      )
      : context.entityErrors.flatMap(
        error => context.field.getValue(
          error.get('errors'),
          { name: this.props.name },
        ),
      );
  }

  handleChangeFactory = context => (
    this.props.useValueChange
      ? (value, name) => {
        if (process.env.NODE_ENV !== 'production') {
          if (name !== this.props.name) throw new Error(`entity-form (onChange with useValueChange): updating another field "${name}" is not supported. Can only update "${this.props.name}"`);
        }

        return context.onItemChange({
          target: { value, name: this.props.name },
          recordWillChange: this.props.recordWillChange,
        });
      }
      : ({ target }) => context.onItemChange({
        target,
        recordWillChange: this.props.recordWillChange,
      })
  );

  handleIdChangeFactory = context => (
    this.props.useValueChange
      ? (value, name) => {
        if (process.env.NODE_ENV !== 'production') {
          if (name !== this.props.name) throw new Error(`entity-form (onChange with useValueChange): updating another field "${name}" is not supported. Can only update "${this.props.name}"`);
        }

        return context.onItemChange({
          target: {
            value: context.field.getField(this.props.name).entity.getId(value),
            name: this.props.name,
          },
          recordWillChange: this.props.recordWillChange,
        });
      }
      : ({ target: { value, name } }) => context.onItemChange({
        target: {
          name,
          value: context.field.getField(this.props.name).entity.getId(value),
        },
        recordWillChange: this.props.recordWillChange,
      })
  );

  renderChildren(context, container) {
    const field = this.props.name && !Array.isArray(this.props.name)
      ? context.field.entity.fields[this.props.name]
      : context.field;

    // TODO check if output is undefined
    return this.props.children(Object.assign(
      {
        field,

        name: this.props.name || context.name,

        value: context.field.getValue(context.value, { name: this.props.name }),

        defaultValue: context.field.getValue(context.defaultValue, { name: this.props.name }),

        record: this.props.name
          ? context.value
          : context.record,

        onChange: this.props.name
          ? this.handleChangeFactory(context)
          : context.onChange,

        options: field.getOptions(),

        disabled: this.props.disabled === undefined
          ? context.disabled
          : this.props.disabled,

        readOnly: this.props.readOnly === undefined
          ? context.readOnly
          : this.props.readOnly,

        errors: this.props.name
          ? this.getErrors(context)
          : context.errors.concat(context.entityErrors),

        mapProps: this.props.name
          ? undefined
          : context.mapProps,
      },

      (this.props.optionsFromApi || this.props.valueFromApi) && container,
    ));
  }

  // TODO check if we should allow ContainerApi if name is undefined or is array
  renderContainer(context, extra = {}) {
    return (
      <ContainerApi
        entity={this.props.name && !Array.isArray(this.props.name)
          ? context.field.entity.fields[this.props.name].entity
          : context.field.entity}
        filterParams={context.field.getField(this.props.name).getFilterParams(context).merge(this.props.filterParams)}
      >
        {container => this.renderChildren(context, {
          ...extra,
          onInputChange: container.onInputChange,
          processing: extra.processing || container.processing,
          processDidFail: extra.processing || container.processDidFail,
          options: container.value,
        })}
      </ContainerApi>
    );
  }

  // TODO need refactor and not use entityId
  // TODO get defaultValue from api?
  renderContainerId(context) {
    if (process.env.NODE_ENV !== 'production') {
      if (!_isString(this.props.name)) throw new Error(`entity-form: name props "${this.props.name}" must be a string if "valueFromApi" is used`);
      if (context.field.getField(this.props.name).many) throw new Error('entity-form: field.many is not supported with valueFromApi');
    }

    const id = context.field.getValue(context.value, { name: this.props.name });

    return (
      <React.Fragment>
        { id && (
          <ContainerApi
            id={id}
            entity={context.field.getField(this.props.name).entity}
            filterParams={context.field.getField(this.props.name).getFilterParamsId(context).merge(this.props.valueFilterParams)}
          >
            {container => this.renderContainer(context, {
              value: container.value,
              onChange: this.handleIdChangeFactory(context),
              defaultValue: container.value,
              processing: container.processing,
              processDidFail: container.processDidFail,
            })}
          </ContainerApi>
        )}

        {!id && this.renderContainer(context, {
          value: null,
          onChange: this.handleIdChangeFactory(context),
          defaultValue: null,
        })}
      </React.Fragment>
    );
  }

  render() {
    return (
      <Consumer>
        {(context) => {
          if (process.env.NODE_ENV !== 'production' && this.props.name !== undefined) {
            // TODO check if form name props is an array. then check if props name is in array
            if (Array.isArray(this.props.name)) {
              if (this.props.name.length === 0) throw new Error('entity-form: "name" props: cannot be an empty array');

              this.props.name.forEach((name) => {
                if (!context.field.entity.fields[name]) throw new Error(`"name" props: (${name}) must be a field in Entity ${context.field.entity.name}`);
              });
            } else if (!context.field.entity.fields[this.props.name]) throw new Error(`"name" props: (${this.props.name}) must be a field in Entity ${context.field.entity.name}`);
          }

          if (this.props.valueFromApi) return this.renderContainerId(context);

          return this.props.optionsFromApi
            ? this.renderContainer(context)
            : this.renderChildren(context);
        }}
      </Consumer>
    );
  }
}

Context.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  useValueChange: PropTypes.bool,
  recordWillChange: PropTypes.func,
  children: PropTypes.func.isRequired,

  valueFromApi: PropTypes.bool,
  valueFilterParams: PropTypesImmutable.map,

  // api
  optionsFromApi: PropTypes.bool,
  filterParams: PropTypesImmutable.map,

  // status
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
};

Context.defaultProps = {
  name: undefined,
  recordWillChange: undefined,
  useValueChange: false,

  // id field
  valueFromApi: false,
  valueFilterParams: Map(),

  // api
  optionsFromApi: false,
  filterParams: Map(),

  // status
  readOnly: undefined,
  disabled: undefined,
};

export default Context;
