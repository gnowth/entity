import _debounce from 'lodash/debounce';
import _isFunction from 'lodash/isFunction';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesDuck from '@gnowth/prop-types-duck';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { List, Map } from 'immutable';
import { createSelector } from 'reselect';

import queryContainer from './query-container';

class Query extends React.Component {
  errorSelector = createSelector(
    x => x,
    value => this.props.field.validate(value),
  );

  handleInputChange = _debounce(this.props.onInputChange, 500);

  handleChange = ({ target: { index, name, value } }) => {
    if (process.env.NODE_ENV !== 'production') {
      if (name !== this.props.name) throw new Error(`Query.handleChange (${this.props.name}): Invalid name ${name}!`);
      if (index === null) throw new Error(`Query.handleChange (${this.props.name}): index cannot be null`);
    }

    return this.props.save(
      index === undefined
        ? value
        : this.props.value.set(index, value),
    );
  }

  componentDidMount() {
    /**
     * HACK(thierry): reading directly from the store
     * to get the latest processing to prevent multiple network call
     */
    const shouldProcess = !this.props.processingSelector(this.props.store.getState())
      && !(this.props.value && this.props.cached);

    if (shouldProcess) {
      this.props.process();
    }
  }

  componentDidUpdate() {
    const shouldProcess = !this.props.processingSelector(this.props.store.getState())
      && !this.props.value;

    if (shouldProcess) {
      this.props.process();
    }
  }

  componentWillUnmount() {
    if (!this.props.persist) {
      this.props.clear();
    }

    if (this.props.persist && !this.props.persistDirty) {
      this.props.clear({ dirty: true });
    }
  }

  getProps() {
    return {
      errors: this.props.processing || this.props.value === undefined
        ? this.props.errors
        : this.errorSelector(this.props.value).concat(this.props.errors),
      field: this.props.field,
      inputValue: this.props.inputValue,
      name: this.props.name,
      onChange: this.handleChange,
      onInputChange: this.handleInputChange,
      processing: this.props.processing,
      processingDidFail: this.props.processingDidFail,
      value: this.props.value,
      valueInitial: this.props.valueInitial,
    };
  }

  getShouldShow() {
    return {
      component: !this.props.shouldProcess || (
        !this.props.many
        && !this.props.processing
        && !this.props.processingDidFail
        && this.props.value !== undefined
      ),

      componentArray: !this.props.shouldProcess || (
        this.props.many
        && !this.props.processing
        && !this.props.processingDidFail
        && this.props.value !== undefined
      ),

      processingComponent: this.props.shouldProcess
        && this.props.processing
        && this.props.processingComponent,

      processingDidFailComponent: this.props.shouldProcess
        && this.props.processingDidFail
        && this.props.processingDidFailComponent,

      recordCountComponent: this.props.shouldProcess
        && this.props.recordCountComponent
        && !this.props.processing
        && !this.props.processingDidFail
        && this.props.queryContainer_action.meta.id === undefined
        && !this.props.recordCountHidden
        && this.props.value !== undefined
        && this.props.value.size > 0,

      recordCountNoneComponent: this.props.shouldProcess
        && this.props.recordCountNoneComponent
        && !this.props.processing
        && !this.props.processingDidFail
        && this.props.queryContainer_action.meta.id === undefined
        && !this.props.recordCountHidden
        && this.props.value !== undefined
        && this.props.value.size === 0,
    };
  }

  renderAsComponent(props) {
    const shouldShow = this.getShouldShow();
    const ProcessingComponent = this.props.processingComponent;
    const ProcessingDidFailComponent = this.props.processingDidFailComponent;
    const RecordCountComponent = this.props.recordCountComponent;
    const RecordCountNoneComponent = this.props.recordCountNoneComponent;

    return (
      <>
        { shouldShow.processingComponent && (
          <ProcessingComponent {...(this.props.processingComponentProps || {})} />
        )}

        { shouldShow.processingDidFailComponent && (
          <ProcessingDidFailComponent {...(this.props.processingDidFailComponentProps || {})} />
        )}

        { shouldShow.recordCountComponent && (
          <RecordCountComponent
            value={
              this.props.field.entity.paginated && this.props.pagination
                ? this.props.pagination.get('count')
                : this.props.value.size
            }
            {...(this.props.recordCountComponentProps || {})}
          />
        )}

        { shouldShow.recordCountNoneComponent && (
          <RecordCountNoneComponent {...(this.props.recordCountNoneComponentProps || {})} />
        )}

        { shouldShow.component && this.renderComponent(props) }

        { shouldShow.componentArray && this.renderComponentArray(props) }
      </>
    );
  }

  renderComponent(props) {
    const Component = this.props.component;

    return (
      <Component
        {...props}
        {...(_isFunction(this.props.componentProps)
          ? this.props.componentProps(props)
          : (this.props.componentProps || {})
        )}
      />
    );
  }

  renderComponentArray(props) {
    const Component = this.props.component;

    return props.value && props.value.map((value, index) => (
      <Component
        key={this.props.field.getEntityId(value)}
        {...props}
        errors={props.field.getErrorsArray(props.errors, { index })}
        index={index}
        value={value}
        {...(_isFunction(this.props.componentProps)
          ? this.props.componentProps(Object.assign({}, props, {
            index,
            value,
            errors: props.field.getErrorsArray(props.errors, { index }),
            valueInitial: props.valueInitial?.get(index),
            records: props.value,
          }))
          : (this.props.componentProps || {})
        )}
        valueInitial={props.valueInitial ?.get(index)}
      />
    ));
  }

  render() {
    return this.props.children
      ? this.props.children(this.getProps())
      : this.renderAsComponent(this.getProps());
  }
}

Query.propTypes = exact({
  action: PropTypes.func.isRequired,
  cached: PropTypes.bool,
  children: PropTypesPlus.allOfType([
    PropTypesPlus.isRequiredIfNot('component', PropTypes.func),
    PropTypesPlus.notRequiredIf('component', PropTypes.func),
  ]),
  clear: PropTypes.func.isRequired,
  component: PropTypesPlus.isRequiredIf('componentProps', PropTypesPlus.component),
  componentProps: PropTypes.shape({}),
  errors: PropTypesImmutable.list,
  field: PropTypesDuck.entityField.isRequired,
  inputValue: PropTypes.string,
  name: PropTypes.string,
  many: PropTypesPlus.notRequiredIf('action', PropTypes.bool),
  onInputChange: PropTypes.func.isRequired,
  pagination: PropTypesImmutable.map,
  persist: PropTypes.bool,
  persistDirty: PropTypesPlus.notRequiredIfNot('persist', PropTypes.bool),
  process: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
  processingComponent: PropTypesPlus.isRequiredIf('processingComponentProps', PropTypesPlus.component),
  processingComponentProps: PropTypes.shape({}),
  processingDidFail: PropTypes.bool.isRequired,
  processingDidFailComponent: PropTypesPlus.isRequiredIf('processingDidFailComponentProps', PropTypesPlus.component),
  processingDidFailComponentProps: PropTypes.shape({}),
  processingSelector: PropTypes.func.isRequired,
  queryContainer_action: PropTypes.shape({
    meta: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  recordCountComponent: PropTypesPlus.isRequiredIf('recordCountComponentProps', PropTypesPlus.component),
  recordCountComponentProps: PropTypes.shape({}),
  recordCountHidden: PropTypes.bool,
  recordCountNoneComponent: PropTypesPlus.isRequiredIf('recordCountNoneComponentProps', PropTypesPlus.component),
  recordCountNoneComponentProps: PropTypes.shape({}),
  save: PropTypes.func.isRequired,
  shouldProcess: PropTypes.bool,
  store: PropTypesPlus.store.isRequired,
  value: PropTypes.oneOfType([
    PropTypesImmutable.list,
    PropTypesImmutable.map,
  ]),
  valueInitial: PropTypes.oneOfType([
    PropTypesImmutable.list,
    PropTypesImmutable.map,
  ]),
});

Query.defaultProps = {
  cached: false,
  children: undefined,
  component: undefined,
  componentProps: undefined,
  errors: List(),
  inputValue: '',
  name: 'entity-duck-query',
  many: undefined,
  pagination: Map(),
  persist: true,
  persistDirty: undefined,
  processingComponent: undefined,
  processingComponentProps: undefined,
  processingDidFailComponent: undefined,
  processingDidFailComponentProps: undefined,
  recordCountComponent: undefined,
  recordCountComponentProps: undefined,
  recordCountHidden: false,
  recordCountNoneComponent: undefined,
  recordCountNoneComponentProps: undefined,
  shouldProcess: true,
  value: undefined,
  valueInitial: undefined,
};

export default queryContainer(Query);
