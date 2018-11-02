import _debounce from 'lodash/debounce';
import _isFunction from 'lodash/isFunction';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesDuck from '@gnowth/prop-types-duck';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { List } from 'immutable';
import { createSelector } from 'reselect';

import queryContainer from './query-container';

class Query extends React.Component {
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

  // TODO check errors when 404 is returned. expect a list
  getProps() {
    return {
      errors: this.props.processing || this.props.value === undefined
        ? this.props.errors
        : this.errorSelector(this.props.value).concat(this.props.errors),
      field: this.props.field,
      initialValue: this.props.initialValue,
      inputValue: this.props.inputValue,
      name: this.props.name, // TODO check about name?
      onChange: this.handleChange,
      onInputChange: this.handleInputChange,
      processing: this.props.processing,
      processingDidFail: this.props.processingDidFail,
      value: this.props.value,
    };
  }

  getShouldShow() { // TODO check all
    // TODO when id is null, skip get?
    // TODO check when id is undefined, then show records count
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

      // TODO maybe shouldProcess should not involve recordCount
      recordCountComponent: this.props.shouldProcess // TODO check that process is a list?
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
        && !this.props.recordsCountHidden
        && this.props.value !== undefined
        && this.props.value.size === 0,
    };
  }

  // TODO use memoize
  errorSelector = createSelector(
    x => x,
    value => this.props.field.validate(value),
  );

  handleChange = ({ target: { index, name, value } }) => {
    if (process.env.NODE_ENV !== 'production') {
      if (name !== this.props.name) throw new Error(`Query (onChange): Invalid name! Expecting "${this.props.name}" instead of ${name}.`);
      if (index === null) throw new Error('Query (onChange): index cannot be null');
      // TODO check that if there is an index, the props.value must be a list
      // if (index !== undefined && this.props.value && 'size' in this.props.value) throw new Error('Query (onChange): index must be undefined as value is not a list');
    }

    return this.props.save(
      index === undefined
        ? value
        : this.props.value.set(index, value),
    );
  }

  handleInputChange = _debounce(this.props.onInputChange, 500);

  renderAsComponent(props) {
    const shouldShow = this.getShouldShow();

    return (
      <>
        { shouldShow.processingComponent && (
          <this.props.processingComponent {...(this.props.processingComponentProps || {})} />
        )}

        { shouldShow.processingDidFailComponent && (
          <this.props.processingDidFailComponent {...(this.props.processingDidFailComponentProps || {})} />
        )}

        { shouldShow.recordCountComponent && (
          <this.props.recordCountComponent
            value={
              this.props.field.entity.paginated && this.props.pagination
                ? this.props.pagination.get('count')
                : this.props.value.size // TODO maybe refactor that bit
            }
            {...(this.props.recordsCountComponentProps || {})}
          />
        )}

        { shouldShow.recordCountNoneComponent && (
          <this.props.recordCountNoneComponent {...(this.props.recordsCountNoneComponentProps || {})} />
        )}

        { shouldShow.component && this.renderComponent(props) }

        { shouldShow.componentArray && this.renderComponentArray(props) }
      </>
    );
  }

  renderComponent(props) {
    return (
      <this.props.component
        {...props}
        {...(_isFunction(this.props.componentProps)
          ? this.props.componentProps(props)
          : (this.props.componentProps || {})
        )}
      />
    );
  }

  renderComponentArray(props) {
    return props.value && props.value.map((value, index) => (
      <this.props.component
        key={this.props.field.getEntityId(value)}
        {...props}
        errors={props.field.getErrorsArray(props.errors, { index })}
        index={index}
        initialValue={props.initialValue?.get(index)}
        value={value}
        {...(_isFunction(this.props.componentProps)
          ? this.props.componentProps(Object.assign({}, props, {
            index,
            value,
            errors: props.field.getErrorsArray(props.errors, { index }),
            initialValue: props.initialValue?.get(index),
            records: props.value,
          }))
          : (this.props.componentProps || {})
        )}
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
  initialValue: PropTypes.oneOfType([
    PropTypesImmutable.list,
    PropTypesImmutable.map,
  ]),
  inputValue: PropTypes.string,
  name: PropTypes.string,
  many: PropTypesPlus.notRequiredIf('action', PropTypes.bool), // TODO not required if action will return a map
  onInputChange: PropTypes.func.isRequired,
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
  queryContainer_action: PropTypes.shape({}).isRequired,
  recordCountComponent: PropTypesPlus.isRequiredIf('recordCountComponentProps', PropTypesPlus.component),
  recordCountComponentProps: PropTypes.shape({}),
  recordCountNoneComponent: PropTypesPlus.isRequiredIf('recordCountNoneComponentProps', PropTypesPlus.component),
  recordCountNoneComponentProps: PropTypes.shape({}),
  save: PropTypes.func.isRequired,
  shouldProcess: PropTypes.bool,
  store: PropTypesPlus.store.isRequired,
  value: PropTypes.oneOfType([
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
  initialValue: undefined,
  inputValue: '',
  name: 'entity-duck-query',
  many: undefined,
  persist: true,
  persistDirty: undefined,
  processingComponent: undefined,
  processingComponentProps: undefined,
  processingDidFailComponent: undefined,
  processingDidFailComponentProps: undefined,
  recordCountComponent: undefined,
  recordCountComponentProps: undefined,
  recordCountNoneComponent: undefined,
  recordCountNoneComponentProps: undefined,
  shouldProcess: true,
  value: undefined,
};

export default queryContainer(Query);
