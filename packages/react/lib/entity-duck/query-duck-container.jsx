import _compose from 'lodash/fp/compose';
import _omit from 'lodash/fp/omit';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { connect } from 'react-redux';

import PropTypesPlus from 'lib/prop-types/Plus';
import withPropsValidation from 'lib/higher-order-component/withPropsValidation';
import withState from 'lib/higher-order-component/withState';

import { withDuck } from './context';

const createDuckRef = action => ({
  clear: (dispatch, options) => action.meta.keyClear
    && dispatch(action.meta.entity.duck[action.meta.keyClear](options)),

  pagination: (state, options) => action.meta.keyPagination
    && action.meta.entity.duck[action.meta.keyPagination](state, options),

  record: (state, options) => action.meta.keyRecord
    && action.meta.entity.duck[action.meta.keyRecord](state, options),

  save: (dispatch, value, options) => action.meta.keySave
    && dispatch(action.meta.entity.duck[action.meta.keySave](value, options)),

  status: (state, options) => !!action.meta.keyStatus
    && action.meta.entity.duck[action.meta.keyStatus](state, options),
});

const mapStateToProps = (state, props) => {
  const params = props.filterParams.update(
    'search',
    search => search || props.withQueryDuckContainer_state.search,
  );

  const action = props.withQueryDuckContainer_state.action || props.action({
    params,
    id: props.id,
  });

  const duckRef = createDuckRef(action);

  return Object.assign(
    {
      action,
      duckRef,
      params,
      entity: action.meta.entity,
      initialValue: duckRef.record(state, action.meta),
      inputValue: props.withQueryDuckContainer_state.search,
      isProcessing: s => duckRef.status(s, {
        params,
        id: props.id,
        method: action.meta.method,
        status: action.meta.keyProcessing,
      }),
      processing: duckRef.status(state, {
        ...action.meta,
        status: action.meta.keyProcessing,
      }),
      processingDidFail: duckRef.status(state, {
        ...action.meta,
        status: action.meta.keyProcessingFail,
      }),
      value: duckRef.record(state, { ...action.meta, dirty: true }),
    },

    action.meta.id === undefined && action.meta.entity.paginated && {
      pagination: duckRef.pagination(state, { params }),
    },
  );
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  _omit(['withQueryDuckContainer_setState', 'withQueryDuckContainer_state'])(ownProps),
  stateProps,
  dispatchProps,
  {
    clear: options => stateProps.duckRef.clear(
      dispatchProps.dispatch,
      { ...stateProps.action.meta, ...options },
    ),
    onInputChange: search => ownProps.withContainer_setState({ search }),
    process: () => !stateProps.processing
      && !stateProps.processingDidFail
      && ownProps.action(),
    save: value => stateProps.duckRef.save(
      dispatchProps.dispatch,
      value,
      { ...stateProps.action.meta, dirty: true },
    ),
  },
);

export default _compose(
  withPropsValidation({
    propTypes: exact({
      action: PropTypes.func.isRequired,
      component: PropTypesPlus.component,
      componentProps: PropTypes.shape({}),
      filterParams: PropTypesImmutable.map,
    }),

    defaultProps: {
      componentProps: {},
      filterParams: Map(),
    },
  }),

  withState({
    initialState: {
      action: undefined,
      search: '',
    },

    mapProps: {
      state: 'withQueryDuckContainer_state',
      setState: 'withQueryDuckContainer_setState',
    },
  }),

  connect(mapStateToProps, null, mergeProps),

  withDuck,
);
