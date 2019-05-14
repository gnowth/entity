import _ from 'lodash';
import Duck from '@burnsred/entity-duck';
import React from 'react';
import { useDefault } from '@burnsred/default';
import { useRedux } from '@private/use-redux';

import useContextInput from './use-context-input';

const mapDefault = {
  store: 'store',
};

function usePropsComponent(componentProps, input) {
  return React.useMemo(
    () => (
      _.isFunction(componentProps)
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

      if (computedAction && computedAction.duck instanceof Duck) {
        return setAction(store.dispatch(computedAction));
      }

      return props.submit
        ? input.onSubmit({
          target: {
            index: input.index,
            name: input.name,
            value: computedAction,
          },
        })
        : input.onChange({
          target: {
            index: input.index,
            name: input.name,
            value: computedAction,
          },
        });
    },
    [props.action, props.submit, input],
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
  usePropsComponent(props, component) {
    const [action, setAction] = React.useState();
    const input = useContextInput(props);
    const status = useStatus(action);

    return Object.assign(
      {
        [props.event]: useHandleEvent(props, input, setAction),
        disabled: input.disabled || input.readOnly || false,
      },

      !_.isString(component) && {
        processing: input.processing || status.processing || false,
        processingDidFail: input.processingDidFail || status.processingDidFail || false,
      },

      usePropsComponent(props.componentProps, input),
    );
  },

  usePropsErrorBoundary(props, components) {
    return React.useMemo(
      () => (
        components.errorBoundaryComponent === React.Fragment
          ? {}
          : props.errorBoundaryComponentProps
      ),
      [props.errorBoundaryComponentProps, components.errorBoundaryComponent],
    );
  },
};
