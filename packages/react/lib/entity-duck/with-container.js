import _omit from 'lodash/fp/omit';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';

import withPropsValidation from 'lib/higher-order-component/withPropsValidation';
import withState from 'lib/higher-order-component/withState';

import PropTypesDuck from 'lib/prop-types/Duck';

const mapStateToProps = (state, props) => {
  const valueParams = Map({
    search: props.withContainer_state.search,
  }).merge(props.filterParams);

  return Object.assign(
    {
      valueParams,

      valueIsGetting: props.entity.duck.status(state, {
        id: props.id,
        params: valueParams,
        status: 'isGetting',
        method: props.meta ? 'options' : 'get',
      }),

      valueDidGetFail: props.entity.duck.status(state, {
        id: props.id,
        params: valueParams,
        status: 'didGetFail',
        method: props.meta ? 'options' : 'get',
      }),

      onInputChange: search => props.withContainer_setState({ search }),
    },

    props.meta && {
      value: props.entity.duck.meta(state, {
        id: props.id,
        params: valueParams,
      }),
    },

    !props.meta && {
      value: props.id === undefined
        ? props.entity.duck.records(state, { params: valueParams })
        : props.entity.duck.record(state, {
          id: props.id,
          params: valueParams,
        }),

      pagination: (
        props.id === undefined
        && props.entity.paginated
        && props.entity.duck.pagination(state, { params: valueParams })
      ) || undefined,
    },
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  getValue: options => dispatch(
    props.meta
      ? props.entity.duck.options({ ...options, id: props.id })
      : props.entity.duck.get({ ...options, id: props.id }),
  ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  _omit(['withContainer_state', 'withContainer_setState'])(ownProps),
  stateProps,
  dispatchProps,
  {
    getValue: () => !stateProps.valueIsGetting
      && !stateProps.valueDidGetFail
      && dispatchProps.getValue({ params: stateProps.valueParams }),
  },
);

export default compose(
  withPropsValidation({
    propTypes: {
      id: PropTypes.string,
      entity: PropTypesDuck.entity.isRequired,
      filterParams: PropTypesImmutable.map,
    },
    defaultProps: {
      id: undefined,
      filterParams: Map(),
    },
  }),
  withState({
    initialState: { search: '' },
    mapProps: {
      state: 'withContainer_state',
      setState: 'withContainer_setState',
    },
  }),
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
);
