import _flowRight from 'lodash/flowRight';
import _omitBy from 'lodash/omitBy';
import PropTypes from 'prop-types';
import { withDefault } from '@gnowth/default';
import { withProps, withPropTypes, withState } from '@gnowth/higher-order-component';
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

  withProps(props => ({
    withQuery_action: props.state.action || props.action(),
  })),

  connect(mapStateToProps, mapDispatchToProps, mergeProps),

  withDefault({
    componentProcessing: 'processingComponent',
    componentProcessingDidFail: 'processingDidFailComponent',
    componentRecordCount: 'recordCountComponent',
    componentRecordCountNone: 'recordCountNoneComponent',
    store: 'store',
  }),
);
