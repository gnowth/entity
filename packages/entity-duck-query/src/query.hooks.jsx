import React from 'react';
import { useDefault } from '@gnowth/default';
import { List } from 'immutable';

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

  useGetProps: (props) => {
    const queryProps = useQuery(props);

    return {
      errors: queryProps.processing || queryProps.value === undefined
        ? queryProps.errors || List()
        : queryProps.field.validate(queryProps.value).concat(queryProps.errors || List()),

      field: queryProps.field,

      name: queryProps.name,

      onChange: ({ target: { index, name, value } }) => {
        if (process.env.NODE_ENV !== 'production') {
          if (name !== queryProps.name) throw new Error(`Query.handleChange (${queryProps.name}): Invalid name ${name}!`);
          if (index === null) throw new Error(`Query.handleChange (${queryProps.name}): index cannot be null`);
        }

        return queryProps.onChange(
          index === undefined
            ? value
            : queryProps.value.set(index, value),
        );
      },

      onSubmit: ({ target: { index, name, value } }) => {
        if (process.env.NODE_ENV !== 'production') {
          if (name !== queryProps.name) throw new Error(`Query.handleSubmit (${queryProps.name}): Invalid name ${name}!`);
          if (index === null) throw new Error(`Query.handleSubmit (${queryProps.name}): index cannot be null`);
        }

        return queryProps.onSubmit(
          index === undefined
            ? value
            : queryProps.value.set(index, value),
        );
      },

      processing: queryProps.processing,
      processingDidFail: queryProps.processingDidFail,
      value: queryProps.value,
      valueInitial: queryProps.valueInitial,
    };
  },

  useGetPropsComponentErrorBoundary: (props, components) => React.useMemo(
    () => (
      components.errorBoundaryComponent === React.Fragment
        ? {}
        : props.errorBoundaryComponentProps
    ),
    [props.errorBoundaryComponentProps, components.errorBoundaryComponent],
  ),

  useShouldShow: (props, componentProps, Components) => ({
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
  }),
};
