import _compose from 'lodash/fp/compose';
import _omit from 'lodash/fp/omit';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { withPropTypes, withState } from '@gnowth/higher-order-component';

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
  const action = props.withQuery_state.action || props.action({
    search: props.withQuery_state.search,
  });

  const duckRef = createDuckRef(action);

  return Object.assign(
    {
      action,
      duckRef,
      params: action.meta.params,
      entity: action.meta.entity,
      initialValue: duckRef.record(state, action.meta),
      inputValue: props.withQuery_state.search,
      isProcessing: s => duckRef.status(s, {
        ...action.meta,
        status: action.meta.keyProcessing,
      }),
      processing: duckRef.status(state, {
        ...action.meta,
        status: action.meta.keyProcessing,
      }),
      processingDidFail: duckRef.status(state, {
        ...action.meta,
        status: action.meta.keyProcessingDidFail,
      }),
      value: duckRef.record(state, { ...action.meta, dirty: true }),
    },

    action.meta.id === undefined && action.meta.entity.paginated && {
      pagination: duckRef.pagination(state, action.meta),
    },
  );
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  _omit(['withQuery_setState', 'withQuery_state'])(ownProps),
  stateProps,
  dispatchProps,
  {
    clear: options => stateProps.duckRef.clear(
      dispatchProps.dispatch,
      { ...stateProps.action.meta, ...options },
    ),
    onInputChange: search => ownProps.withQuery_setState({ search }),
    process: () => !stateProps.processing
      && !stateProps.processingDidFail
      && dispatchProps.dispatch(ownProps.action({
        search: ownProps.withQuery_state.search,
      })),
    save: value => stateProps.duckRef.save(
      dispatchProps.dispatch,
      value,
      { ...stateProps.action.meta, dirty: true },
    ),
  },
);

// TODO remove exact or withPropTypes
export default _compose(
  withPropTypes({
    propTypes: exact({
      action: PropTypes.func.isRequired,
      children: PropTypes.func, // TODO check with component
      component: PropTypesPlus.component,
      componentProps: PropTypes.shape({}),
      filterParams: PropTypesImmutable.map,
    }),

    defaultProps: {
      children: undefined,
      componentProps: undefined,
      filterParams: Map(),
    },
  }),

  withState({
    initialState: {
      action: undefined,
      search: '',
    },

    mapProps: {
      state: 'withQuery_state',
      setState: 'withQuery_setState',
    },
  }),

  connect(mapStateToProps, null, mergeProps),
);
