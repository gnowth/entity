import _flowRight from 'lodash/flowRight';
import _omitBy from 'lodash/omitBy';
import PropTypes from 'prop-types';
import { withDefault } from '@gnowth/default';
import { withProps, withPropTypes, withState } from '@gnowth/higher-order-component';
import { connect } from 'react-redux';

// TODO need to make sure keyRecord is provided!
const mapStateToProps = (state, props) => Object.assign(
  {
    field: props.withQuery_action.meta.entity.toEntityField(),

    initialValue: props.withQuery_record(state, props.withQuery_action.meta),

    inputValue: props.withQuery_state.search,

    processing: !!props.withQuery_action.meta.keyProcessing
      && props.withQuery_status(state, {
        ...props.withQuery_action.meta,
        status: props.withQuery_action.meta.keyProcessing,
      }),

    processingDidFail: !!props.withQuery_action.meta.keyProcessingDidFail
      && props.withQuery_status(state, {
        ...props.withQuery_action.meta,
        status: props.withQuery_action.meta.keyProcessingDidFail,
      }),

    processingSelector: s => !!props.withQuery_action.meta.keyProcessing
      && props.withQuery_status(s, {
        ...props.withQuery_action.meta,
        status: props.withQuery_action.meta.keyProcessing,
      }),

    value: props.withQuery_record(state, {
      ...props.withQuery_action.meta,
      dirty: true,
    }),
  },

  props.withQuery_action.meta.id === undefined && props.withQuery_action.meta.entity.paginated && {
    pagination: props.withQuery_pagination(state, props.withQuery_action.meta),
  },
);

const mapDispatchToProps = (dispatch, props) => ({
  clear: (options = {}) => dispatch(props.withQuery_clear({ ...props.withQuery_action.meta, ...options })),
  onInputChange: search => dispatch(props.withQuery_setState({ search })),
  process: () => dispatch(props.withQuery_action),
  save: record => dispatch(props.withQuery_save_local(record, props.withQuery_action.meta)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  _omitBy(ownProps, (_, key) => key.startsWith('withQuery_')),
  stateProps,
  dispatchProps,
  {
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
      state: 'withQuery_state',
      setState: 'withQuery_setState',
    },
  }),

  withProps((props) => {
    const action = props.withQuery_state.action
      || props.action({ search: props.withQuery_state.search });

    return {
      withQuery_action: action,

      withQuery_clear: options => action.meta.keyClear
        && action.meta.entity.duck[action.meta.keyClear]?.(options),

      withQuery_pagination: (state, options) => action.meta.keyPagination
        && action.meta.entity.duck[action.meta.keyPagination]?.(state, options),

      withQuery_record: (state, options) => action.meta.keyRecord
        && action.meta.entity.duck[action.meta.keyRecord]?.(state, options),

      withQuery_save_local: (value, options) => action.meta.keySave
        && action.meta.entity.duck[action.meta.keySave]?.(value, options),

      withQuery_status: (state, options) => !!action.meta.keyStatus
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
