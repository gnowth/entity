import _flowRight from 'lodash/flowRight';
import _omitBy from 'lodash/omitBy';
import PropTypes from 'prop-types';
import { withDefault } from '@gnowth/default';
import { withProps, withPropTypes, withState } from '@gnowth/higher-order-component';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => Object.assign(
  {
    errors: props.queryContainer_action.duck.queries.errors(props.queryContainer_action, state),

    field: props.queryContainer_action.duck.entity.getEntityField({ many: props.queryContainer_action.meta.id === undefined }),

    inputValue: props.queryContainer_state.search,

    processing: props.queryContainer_action.duck.queries.processing(props.queryContainer_action, state),

    processingDidFail: props.queryContainer_action.duck.queries.processingDidFail(props.queryContainer_action, state),

    processingSelector: s => props.queryContainer_action.duck.queries.processing(props.queryContainer_action, s),

    value: props.queryContainer_action.duck.queries.value(props.queryContainer_action, state),

    valueInitial: props.queryContainer_action.duck.queries.valueInitial(props.queryContainer_action, state),
  },

  props.queryContainer_action.meta.id === undefined && props.queryContainer_action.duck.entity.paginated && {
    pagination: props.queryContainer_action.duck.queries.processing(props.queryContainer_action, state),
  },
);

const mapDispatchToProps = (dispatch, props) => ({
  clear: options => dispatch(props.queryContainer_action.duck.queries.clear(props.queryContainer_action, options)),
  process: () => dispatch(props.queryContainer_action),
  save: (record, options) => dispatch(props.queryContainer_action.duck.queries.onChange(props.queryContainer_action, record, options)),
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

  withProps(props => ({
    queryContainer_action: props.queryContainer_state.action
      || props.action({ search: props.queryContainer_state.search }),
  })),

  connect(mapStateToProps, mapDispatchToProps, mergeProps),

  withDefault({
    processingComponent: ['entityDuckQuery_processing', 'component_processing'],
    processingDidFailComponent: ['entityDuckQuery_processingDidFail', 'component_processingDidFail'],
    recordCountComponent: ['entityDuckQuery_recordCount', 'component_recordCount'],
    recordCountNoneComponent: ['entityDuckQuery_recordCountNone', 'component_recordCountNone'],
    store: 'store',
  }),
);
