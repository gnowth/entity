import _debounce from 'lodash/fp/debounce';
import _isFunction from 'lodash/fp/isFunction';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
// import { Entity } from '@gnowth/entity';

// import Duck from './duck';
import withQueryDuckContainer from './query-duck-container';

class QueryDuck extends React.Component {
  componentDidMount() {
    /**
     * HACK(thierry): reading directly from the store
     * to get the latest processing to prevent multiple network call
     */
    const shouldProcess = !this.props.isProcessing(this.props.store.getState())
      && !(this.props.value && this.props.cached);

    if (shouldProcess) {
      this.props.process();
    }
  }

  componentDidUpdate() {
    const shouldProcess = !this.props.isProcessing(this.props.store.getState())
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
    return Object.assign(
      {
        field: this.props.entity.toEntityField(),
        initialValue: this.props.initialValue,
        inputValue: this.props.inputValue,
        name: this.props.name,
        onChange: this.handleChange,
        onInputChange: this.handleInputChange,
        value: this.props.value,
      },

      !this.props.shouldProcess && {
        processing: this.props.processing,
        processingDidFail: this.props.processingDidFail,
      },
    );
  }

  handleChange = ({ target: { index, name, value } }) => {
    if (process.env.NODE_ENV !== 'production') {
      if (name !== this.props.name) throw new Error(`QueryDuck (onChange): "${name}" name provided. Expecting name "${this.props.name}"`);
      if (this.props.id !== undefined && index !== undefined) throw new Error('QueryDuck (onChange): index must be undefined as value is not a list');
      if (index === null) throw new Error('QueryDuck (onChange): index cannot be null');
    }

    return this.props.save(
      index === undefined
        ? value
        : this.props.value.set(index, value),
    );
  }

  handleInputChange = _debounce(500)(this.props.onInputChange);

  renderAsComponent(props) {
    return (
      <>
        { this.props.shouldProcess
          && this.props.processing
          && this.props.processingComponent
          && (
            <this.props.processingComponent
              {...(this.props.processingComponentProps || {})}
            />
          )
        }

        { this.props.shouldProcess
          && this.props.processingDidFail
          && this.props.processingDidFailComponent
          && (
            <this.props.processingDidFailComponent
              {...(this.props.processingDidFailComponentProps || {})}
            />
          )
        }

        { this.props.shouldProcess
          && !this.props.processing
          && !this.props.processingDidFail
          && !this.props.recordsCountHidden
          && this.props.value !== undefined
          && (
            <this.props.recordsCountComponent
              value={
                this.props.entity.paginated && this.props.pagination
                  ? this.props.pagination.get('count')
                  : this.props.value.size
              }
              {...(this.props.recordsCountComponentProps || {})}
            />
          )
        }

        { this.props.shouldProcess
          && !this.props.processing
          && !this.props.processingDidFail
          && !this.props.recordsCountHidden
          && this.props.value !== undefined
          && (
            <this.props.recordsCountNoneComponent
              {...(this.props.recordsCountNoneComponentProps || {})}
            />
          )
        }

        { this.props.shouldProcess
          && !this.props.processing
          && !this.props.processingDidFail
          && this.props.value !== undefined
          && (
            this.props.many
              ? this.renderComponentArray(props)
              : this.renderComponent(props)
          )
        }

        { !this.props.shouldProcess && this.renderComponent(props) }
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
    return props.value.map((v, index) => (
      <this.props.component
        key={this.props.entity.getId(v)}
        {...props}
        index={index}
        initialValue={props.initialValue?.get(index)}
        records={props.value}
        value={v}
        {...(_isFunction(this.props.componentProps)
          ? this.props.componentProps(Object.assign({}, props, {
            index,
            initialValue: props.initialValue?.get(index),
            records: props.value,
            value: v,
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

QueryDuck.propTypes = {
  cached: PropTypes.bool,
  children: PropTypesPlus.isRequiredIfNot('component', PropTypes.func),
  clear: PropTypes.func.isRequired,
  entity: PropTypes.func.isRequired, // TODO add proper propTypes
  component: PropTypesPlus.isRequiredIf('componentProps', PropTypesPlus.component),
  componentProps: PropTypes.shape({}),
  id: PropTypes.string,
  initialValue: PropTypes.oneOfType([
    PropTypesImmutable.list,
    PropTypesImmutable.map,
  ]), // TODO add: PropTypesPlus.ifElse(({ id }) === undefined, PropTypesImmutable.List, PropTypesImmutable.map)
  inputValue: PropTypes.string,
  isProcessing: PropTypes.func.isRequired,
  many: PropTypes.bool, // TODO add: PropTypesPlus.notRequiredIf(({ id }) => id !== undefined)
  name: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  pagination: PropTypesImmutable.map, // PropTypesPlus.isRequiredIf(({ entity }) => entity?.paginated, PropTypesImmutable.map), // TODO add shape? innitialValue?
  params: PropTypesImmutable.map.isRequired,
  persist: PropTypes.bool,
  persistDirty: PropTypes.bool, // TODO add: PropTypesPlus.notRequiredIf(({ persist }) => !persist)
  process: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
  processingComponent: PropTypesPlus.isRequiredIf('processingComponentProps', PropTypesPlus.component),
  processingComponentProps: PropTypes.shape({}),
  processingDidFail: PropTypes.bool.isRequired,
  processingDidFailComponent: PropTypesPlus.isRequiredIf('processingDidFailComponentProps', PropTypesPlus.component),
  processingDidFailComponentProps: PropTypes.shape({}),
  recordsCountComponent: PropTypesPlus.isRequiredIf('recordsCountComponentProps', PropTypesPlus.component),
  recordsCountComponentProps: PropTypes.shape({}),
  recordsCountHidden: PropTypes.bool,
  recordsCountNoneComponent: PropTypesPlus.isRequiredIf('recordsCountNoneComponentProps', PropTypesPlus.component),
  recordsCountNoneComponentProps: PropTypes.shape({}),
  save: PropTypes.func.isRequired,
  shouldProcess: PropTypes.bool,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
  value: PropTypes.oneOfType([
    PropTypesImmutable.list,
    PropTypesImmutable.map,
  ]), // TODO add: PropTypesPlus.ifElse(({ id }) === undefined, PropTypesImmutable.List, PropTypesImmutable.map)
};

QueryDuck.defaultProps = {
  cached: true,
  children: undefined,
  component: undefined,
  componentProps: undefined,
  id: undefined,
  initialValue: undefined,
  inputValue: '',
  many: undefined,
  name: 'query_duck',
  pagination: undefined,
  persist: true,
  persistDirty: undefined,
  processingComponent: undefined,
  processingComponentProps: undefined,
  processingDidFailComponent: undefined,
  processingDidFailComponentProps: undefined,
  recordsCountComponent: undefined,
  recordsCountComponentProps: undefined,
  recordsCountHidden: false,
  recordsCountNoneComponent: undefined,
  recordsCountNoneComponentProps: undefined,
  shouldProcess: false,
  value: undefined,
};

export default withQueryDuckContainer(QueryDuck);
