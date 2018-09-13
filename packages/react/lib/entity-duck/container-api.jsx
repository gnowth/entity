import _debounce from 'lodash/fp/debounce';
import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { is, Map } from 'immutable';

import store from 'store'; // TODO Remove dependency
import PropTypesDuck from 'lib/prop-types/Duck';
import PropTypesPlus from 'lib/prop-types/Plus';

import withContainer from './with-container';

class ContainerApi extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      defaultValue: nextProps.value,
      value: is(prevState.defaultValue, nextProps.value)
        ? prevState.value
        : nextProps.value,
    };
  }

  state = {
    defaultValue: this.props.value,
    value: this.props.value,
  };

  componentDidMount() {
    /**
     * HACK(thierry): reading directly from the store
     * to get the latest isGetting to prevent multiple network call
     */
    const isGetting = this.props.entity.duck.status(store.getState(), {
      id: this.props.id,
      params: this.props.valueParams,
      status: 'isGetting',
      method: this.props.meta ? 'options' : 'get',
    });

    if (!isGetting) {
      this.props.getValue();
    }
  }

  componentDidUpdate() {
    /**
     * HACK(thierry): reading directly from the store
     * to get the latest isGetting to prevent multiple network call
     */
    const isGetting = this.props.entity.duck.status(store.getState(), {
      id: this.props.id,
      params: this.props.valueParams,
      status: 'isGetting',
      method: this.props.meta ? 'options' : 'get',
    });

    if (!isGetting && !this.props.value) {
      this.props.getValue();
    }
  }

  handleArrayChange = ({ target: { name, value, index } }) => {
    if (process.env.NODE_ENV !== 'production') {
      if (name !== 'value') throw new Error('entity-duck (ContainerApi): only field named "value" can be changed');
    }

    this.setState(prevState => ({ [name]: prevState[name].set(index, value) }));
  }

  handleChange = ({ target: { name, value } }) => {
    if (process.env.NODE_ENV !== 'production') {
      if (name !== 'value') throw new Error('entity-duck (ContainerApi): only field named "value" can be changed');
    }

    this.setState({ [name]: value });
  }

  handleInputChange = _debounce(500)(this.props.onInputChange);

  renderAsChildren() {
    return this.props.children({
      name: 'value',
      defaultValue: this.props.value,
      value: this.state.value,
      onChange: this.handleChange,
      onInputChange: this.handleInputChange,
      field: this.props.entity.toEntityField(),
      processing: this.props.valueIsGetting,
      processDidFail: this.props.valueDidGetFail,
    });
  }

  renderAsComponent() {
    const Component = this.props.component;
    const RecordsNoneComponent = this.props.recordsNoneComponent;
    const RecordsCountComponent = this.props.recordsCountComponent;
    const ProcessingComponent = this.props.processingComponent;
    const ProcessingDidFailComponent = this.props.processingDidFailComponent;

    return (
      <React.Fragment>
        { this.props.process && this.props.valueIsGetting && (
          <ProcessingComponent {...this.props.processingComponentProps} />
        )}

        { this.props.process && this.props.valueDidGetFail && (
          <ProcessingDidFailComponent {...this.props.processingDidFailComponentProps} />
        )}

        { this.props.process
          && !this.props.valueIsGetting
          && !this.props.valueDidGetFail
          && this.props.id === undefined
          && !this.props.meta
          && this.state.value
          && this.state.value.size === 0
          && (
            <RecordsNoneComponent {...this.props.recordsNoneComponentProps} />
          )
        }

        { this.props.process
          && !this.props.hideRecordsCount
          && !this.props.valueIsGetting
          && !this.props.valueDidGetFail
          && this.props.id === undefined
          && !this.props.meta
          && this.state.value
          && this.state.value.size > 0
          && (
            <RecordsCountComponent
              value={this.props.entity.paginated
                ? this.props.pagination.get('count')
                : this.state.value.size
              }
              {...this.props.recordsCountComponentProps}
            />
          )
        }

        { this.props.process
          && !this.props.valueIsGetting
          && !this.props.valueDidGetFail
          && this.state.value
          && (this.props.id !== undefined || this.state.value.size > 0)
          && (
            this.props.many
              ? this.renderArrayComponent(Component)
              : this.renderComponent(Component)
          )
        }

        { !this.props.process && (
          <Component
            name="value"
            defaultValue={this.state.defaultValue}
            value={this.state.value}
            onChange={this.handleChange}
            onInputChange={this.props.onInputChange}
            field={this.props.entity.toEntityField()}
            processing={this.props.valueIsGetting}
            processingDidFail={this.props.valueDidGetFail}
            {...this.props.componentProps}
          />
        )}
      </React.Fragment>
    );
  }

  renderComponent(Component) {
    return (
      <Component
        name="value"
        defaultValue={this.state.defaultValue}
        value={this.state.value}
        onChange={this.handleChange}
        onInputChange={this.props.onInputChange}
        field={this.props.entity.toEntityField()}
        {...this.props.componentProps}
      />
    );
  }

  // TODO add handleChange for array
  renderArrayComponent(Component) {
    return this.state.value.map((v, index) => (
      <Component
        key={this.props.entity.getId(v)}
        index={index}
        name="value"
        defaultValue={this.state.defaultValue && this.state.defaultValue.get(index)}
        value={v}
        records={this.state.value}
        onChange={({ target: { value, name } }) => this.handleArrayChange({ target: { value, name, index } })}
        onArrayChange={this.handleChange}
        field={this.props.entity.toEntityField()}
        {...this.props.componentProps}
      />
    ));
  }

  render() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.component && this.props.children) throw new Error('entity-duck (ContainerApi): either "children" props or "component" props can be set');
      if (this.props.process && this.props.children) throw new Error('entity-duck (ContainerApi): children must not be set if process is "true"');
      if (this.props.many && !this.props.process) throw new Error('entity-duck (ContainerApi): "process" props must be set to use props "many"');
      if (this.props.many && this.props.id !== undefined) throw new Error('entity-duck (ContainerApi): "many" props cannot be set if "id" props is set');
    }

    return this.props.children
      ? this.renderAsChildren()
      : this.renderAsComponent();
  }
}

ContainerApi.propTypes = {
  id: PropTypes.string,
  entity: PropTypesDuck.entity.isRequired,
  children: PropTypesPlus.isRequiredIfNot('component', PropTypes.func),
  process: PropTypes.bool,
  meta: PropTypes.bool,
  many: PropTypes.bool,

  // component
  componentProps: PropTypes.shape({}),
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),

  processingComponentProps: PropTypes.shape({}),
  processingComponent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),

  processingDidFailComponentProps: PropTypes.shape({}),
  processingDidFailComponent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),

  recordsNoneComponentProps: PropTypes.shape({}),
  recordsNoneComponent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),

  recordsCountComponentProps: PropTypes.shape({}),
  recordsCountComponent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),

  hideRecordsCount: PropTypes.bool,

  // HOC props
  value: PropTypes.oneOfType([
    PropTypesImmutable.map,
    PropTypesImmutable.list,
  ]),
  valueParams: PropTypesImmutable.map.isRequired,
  getValue: PropTypes.func.isRequired,
  pagination: PropTypesImmutable.map,

  // status
  valueIsGetting: PropTypes.bool.isRequired,
  valueDidGetFail: PropTypes.bool.isRequired,

  // event
  onInputChange: PropTypes.func,
};

// TODO convert default component to TypeSet
ContainerApi.defaultProps = {
  id: undefined,
  value: undefined,
  onInputChange: x => x,
  children: undefined,
  hideRecordsCount: false,
  pagination: Map(),
  meta: false,
  many: false,

  // component
  process: false,
  component: undefined,
  componentProps: {},
  processingComponentProps: {},
  processingComponent: () => 'Loading ...',
  processingDidFailComponentProps: {},
  processingDidFailComponent: () => 'Unable to load data. Try to refresh the page',
  recordsNoneComponentProps: {},
  recordsNoneComponent: () => 'No Records Found',
  recordsCountComponentProps: {},
  recordsCountComponent: ({ value }) => `${value} Record(s) Found`,
};

export default withContainer(ContainerApi);
