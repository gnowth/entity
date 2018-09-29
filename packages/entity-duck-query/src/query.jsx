import _isFunction from 'lodash/isFunction';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesDuck from '@gnowth/prop-types-duck';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';

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

  getProps() {
    return {
      field: this.props.field,
      initialValue: this.props.initialValue,
      inputValue: this.props.inputValue,
      name: this.props.name, // TODO check about name?
      onChange: this.handleChange,
      onInputChange: this.handleInputChange, // TODO use props?
      processing: this.props.processing,
      processingDidFail: this.props.processingDidFail,
      value: this.props.value,
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

      recordCountComponent: this.props.shouldProcess // TODO check that process is a list?
        && this.props.recordCountComponent
        && !this.props.processing
        && !this.props.processingDidFail
        && !this.props.recordCountHidden
        && this.props.value !== undefined,

      recordCountNoneComponent: this.props.shouldProcess
        && this.props.recordCountNoneComponent
        && !this.props.processing
        && !this.props.processingDidFail
        && !this.props.recordsCountHidden
        && this.props.value !== undefined,
    };
  }

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
          <this.props.recordsCountComponent
            value={
              this.props.entity.paginated && this.props.pagination
                ? this.props.pagination.get('count')
                : this.props.value.size // TODO maybe refactor that bit
            }
            {...(this.props.recordsCountComponentProps || {})}
          />
        )}

        { shouldShow.recordCountNoneComponent && (
          <this.props.recordsCountNoneComponent {...(this.props.recordsCountNoneComponentProps || {})} />
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
        key={this.props.field.entity.getId(value)} // TODO field.getEntityId
        {...props}
        index={index}
        initialValue={props.initialValue?.get(index)}
        value={value}
        {...(_isFunction(this.props.componentProps)
          ? this.props.componentProps(Object.assign({}, props, {
            index,
            value,
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
  cached: PropTypes.bool,
  children: PropTypesPlus.allOfType([
    PropTypesPlus.isRequiredIfNot('component', PropTypes.func),
    PropTypesPlus.notRequiredIf('component', PropTypes.func),
  ]),
  clear: PropTypes.func.isRequired, // ---
  component: PropTypesPlus.isRequiredIf('componentProps', PropTypesPlus.component),
  componentProps: PropTypes.shape({}),
  field: PropTypesDuck.entityField.isRequired,
  initialValue: PropTypes.oneOfType([
    PropTypesImmutable.list,
    PropTypesImmutable.map,
  ]),
  many: PropTypesPlus.notRequiredIf('action', PropTypes.bool), // TODO not required if action will return a map
  onChange: PropTypes.func.isRequired, // TODO think about onSubmit
  onInputChange: PropTypes.func.isRequired,
  persist: PropTypes.bool,
  persistDirty: PropTypesPlus.notRequiredIfNot('persist', PropTypes.bool), // TOOD implement notRequiredIfNot in prop-types-plus
  process: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
  processingComponent: PropTypesPlus.isRequiredIf('processingComponentProps', PropTypesPlus.component),
  processingComponentProps: PropTypes.shape({}),
  processingDidFail: PropTypes.bool.isRequired,
  processingDidFailComponent: PropTypesPlus.isRequiredIf('processingDidFailComponentProps', PropTypesPlus.component),
  processingDidFailComponentProps: PropTypes.shape({}),
  processingSelector: PropTypes.func.isRequired,
  recordCountComponent: PropTypesPlus.isRequiredIf('recordCountComponentProps', PropTypesPlus.component),
  recordCountComponentProps: PropTypes.shape({}),
  recordCountNoneComponent: PropTypesPlus.isRequiredIf('recordCountNoneComponentProps', PropTypesPlus.component),
  recordCountNoneComponentProps: PropTypes.shape({}),
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
  initialValue: undefined,
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
