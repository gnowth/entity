import _flowRight from 'lodash/flowRight';
import _omitBy from 'lodash/omitBy';
import PropTypes from 'prop-types';
import { withDefault } from '@gnowth/default';
import { withProps, withPropTypes, withState } from '@gnowth/higher-order-component';
import { connect } from 'react-redux';

// TODO need to make sure keyRecord is provided!
const mapStateToProps = (state, props) => Object.assign(
  {
    errors: props.queryContainer_errors(state, props.queryContainer_action.meta),

    field: props.queryContainer_action.meta.entity.getEntityField({ many: props.queryContainer_action.meta.id === undefined }),

    initialValue: props.queryContainer_record(state, props.queryContainer_action.meta),

    inputValue: props.queryContainer_state.search,

    processing: !!props.queryContainer_action.meta.keyProcessing
      && props.queryContainer_status(state, {
        ...props.queryContainer_action.meta,
        status: props.queryContainer_action.meta.keyProcessing,
      }),

    processingDidFail: !!props.queryContainer_action.meta.keyProcessingDidFail
      && props.queryContainer_status(state, {
        ...props.queryContainer_action.meta,
        status: props.queryContainer_action.meta.keyProcessingDidFail,
      }),

    processingSelector: s => !!props.queryContainer_action.meta.keyProcessing
      && props.queryContainer_status(s, {
        ...props.queryContainer_action.meta,
        status: props.queryContainer_action.meta.keyProcessing,
      }),

    value: props.queryContainer_record(state, {
      ...props.queryContainer_action.meta,
      dirty: true,
    }),
  },

  props.queryContainer_action.meta.id === undefined && props.queryContainer_action.meta.entity.paginated && {
    pagination: props.queryContainer_pagination(state, props.queryContainer_action.meta),
  },
);

const mapDispatchToProps = (dispatch, props) => ({
  clear: (options = {}) => dispatch(props.queryContainer_clear({ ...props.queryContainer_action.meta, ...options })),
  process: () => dispatch(props.queryContainer_action),
  save: record => dispatch(props.queryContainer_save_local(record, { id: props.queryContainer_action.meta.id })),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  _omitBy(ownProps, (_, key) => key.startsWith('queryContainer_')),
  stateProps,
  dispatchProps,
  {
    queryContainer_action: ownProps.queryContainer_action,
    onInputChange: search => ownProps.queryContainer_setState({ search }),
    process: () => !stateProps.processing
      && !stateProps.processingDidFail
      && dispatchProps.process(),
  },
);

export default _flowRight(
  withPropTypes({
    propTypes: { action: PropTypes.func.isRequired },
  }),

  withState({
    initialState: {
      action: undefined,
      search: '',
    },

    mapProps: {
      state: 'queryContainer_state',
      setState: 'queryContainer_setState',
    },
  }),

  withProps((props) => {
    const action = props.queryContainer_state.action
      || props.action({ search: props.queryContainer_state.search });

    return {
      queryContainer_action: action,

      queryContainer_clear: options => action.meta.keyClear
        && action.meta.entity.duck[action.meta.keyClear]?.(options),

      queryContainer_errors: (state, options) => action.meta.keyErrors
        && action.meta.entity.duck[action.meta.keyErrors]?.(state, options),

      queryContainer_pagination: (state, options) => action.meta.keyPagination
        && action.meta.entity.duck[action.meta.keyPagination]?.(state, options),

      queryContainer_record: (state, options) => action.meta.keyRecord
        && action.meta.entity.duck[action.meta.keyRecord]?.(state, options),

      queryContainer_save_local: (value, options) => action.meta.keySaveLocal
        && action.meta.entity.duck[action.meta.keySaveLocal]?.(value, options),

      queryContainer_status: (state, options) => !!action.meta.keyStatus
        && action.meta.entity.duck[action.meta.keyStatus]?.(state, options),
    };
  }),

  connect(mapStateToProps, mapDispatchToProps, mergeProps),

  withDefault({
    processing: 'processingComponent',
    processingDidFail: 'processingDidFailComponent',
    recordCount: 'recordCountComponent',
    recordCountNone: 'recordCountNoneComponent',
    store: 'store',
  }),
);
