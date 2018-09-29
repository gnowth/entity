import _flowRight from 'lodash/flowRight';
import _isFunction from 'lodash/isFunction';
import _omitBy from 'lodash/omitBy';
import { withProps, withState } from '@gnowth/higher-order-component';
import { connect } from 'react-redux';

// TODO make sure withQuery_action is avaliable
// TODO need to make sure keyRecord is provided!
const mapStateToProps = (state, props) => ({
  initialValue: props.withQuery_record(state, props.withQuery_action.meta),

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
});

const mapDispatchToProps = (dispatch, props) => ({
  clear: () => dispatch(props.withQuery_clear()),
  save: record => dispatch(props.withQuery_save(record)),
  save_local: record => dispatch(props.withQuery_save_local(record)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  _omitBy(ownProps, (_, key) => key.startsWith('withQuery_')),
  stateProps,
  dispatchProps,
  {
  },
);

export default _flowRight(
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

  connect(mapStateToProps, mapDispatchToProps, mergeProps),
);
