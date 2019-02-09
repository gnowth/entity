import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import Duck from '@entity/duck';
import React from 'react';
import { useDefault } from '@gnowth/default';

import useInput from './use-input';
import useRedux from './use-redux';

const mapDefault = {
  store: 'store',
};

function useGetPropsComponent(componentProps, input) {
  return React.useMemo(
    () => (
      _isFunction(componentProps)
        ? componentProps(input)
        : componentProps
    ),
    [componentProps, input],
  );
}

function useHandleEvent(props, input, setAction) {
  const { store } = useDefault(mapDefault);

  return React.useCallback(
    () => {
      const computedAction = props.action(input);

      return computedAction.duck instanceof Duck
        ? setAction(store.dispatch(computedAction))
        : input.onChange({
          target: {
            name: input.name,
            value: computedAction,
          },
        });
    },
    [props.action, input],
  );
}

function useStatus(action) {
  const mapStateToProps = React.useMemo(
    () => action && (state => ({
      processing: action.duck.queries.processing(action, state),
      processingDidFail: action.duck.queries.processingDidFail(action, state),
    })),
    [action],
  );

  return useRedux(mapStateToProps).state;
}

export default {
  useGetPropsComponent: (props, component) => {
    const [action, setAction] = React.useState();
    const input = useInput(props);
    const status = useStatus(action);

    return Object.assign(
      {
        [props.event]: useHandleEvent(props, input, setAction),
        disabled: input.disabled || input.readOnly || false,
      },

      !_isString(component) && {
        processing: input.processing || status.processing || false,
        processingDidFail: input.processingDidFail || status.processingDidFail || false,
      },

      useGetPropsComponent(props.componentProps, input),
    );
  },
};
