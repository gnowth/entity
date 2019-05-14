import React from 'react';
import { useDefault } from '@burnsred/default';

import useQuery from './use-query';

const mapDefault = {
  errorBoundaryComponent: ['entityDuckQuery_errorBoundary', 'component_errorBoundary'],
  processingComponent: ['entityDuckQuery_processing', 'component_processing'],
  processingDidFailComponent: ['entityDuckQuery_processingDidFail', 'component_processingDidFail'],
  recordCountComponent: ['entityDuckQuery_recordCount', 'component_recordCount'],
  recordCountNoneComponent: ['entityDuckQuery_recordCountNone', 'component_recordCountNone'],
};

export default {
  useComponents(props) {
    const Components = useDefault(mapDefault, props);

    return {
      ...Components,
      errorBoundaryComponent: Components.errorBoundaryComponent || React.Fragment,
    };
  },

  usePropsComponent(props) {
    return useQuery(props);
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

  useShouldShow(props, componentProps, Components) {
    return {
      children: !!props.children,

      component: !props.children && (
        !props.shouldProcess || (
          !props.many
          && !componentProps.processing
          && !componentProps.processingDidFail
          && componentProps.value !== undefined
        )
      ),

      componentArray: !props.children && (
        !props.shouldProcess || (
          !!props.many
          && !componentProps.processing
          && !componentProps.processingDidFail
          && componentProps.value !== undefined
        )
      ),

      processingComponent: !props.children
        && props.shouldProcess
        && componentProps.processing
        && Components.processingComponent,

      processingDidFailComponent: !props.children
        && props.shouldProcess
        && componentProps.processingDidFail
        && Components.processingDidFailComponent,

      recordCountComponent: !props.children
        && props.shouldProcess
        && Components.recordCountComponent
        && !componentProps.processing
        && !componentProps.processingDidFail
        && props.action.meta.id === undefined
        && !props.recordCountHidden
        && componentProps.value !== undefined
        && componentProps.value.size > 0,

      recordCountNoneComponent: !props.children
        && props.shouldProcess
        && Components.recordCountNoneComponent
        && !componentProps.processing
        && !componentProps.processingDidFail
        && props.action.meta.id === undefined
        && !props.recordCountHidden
        && componentProps.value !== undefined
        && componentProps.value.size === 0,
    };
  },
};
