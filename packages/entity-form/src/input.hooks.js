import _ from 'lodash';
import React from 'react';
import { useDefault } from '@burnsred/default';

export default {
  useComponents(props, input) {
    const mapDefault = React.useMemo(
      () => ({
        component: `widget_${props.type || input.field.type}`,
        errorBoundaryComponent: ['entityForm_errorBoundary', 'component_errorBoundary'],
        wrapperComponent: ['entityForm_label', 'component_label'],
      }),
      [props.type, input.field.type],
    );

    const Components = useDefault(mapDefault, props);

    return {
      component: Components.component,
      errorBoundary: Components.errorBoundaryComponent || React.Fragment,
      wrapper: props.children || !Components.wrapperComponent
        ? React.Fragment
        : Components.wrapperComponent,
    };
  },

  useProps(props, input, Components) {
    return _.omitBy(Object.assign(
      {
        name: props.name,
        onChange: input.onChange,
        onSubmit: input.onSubmit,
        value: input.value,
      },

      (props.children || !_.isString(Components.component)) && {
        errors: input.errors,
        field: input.field,
        onChangeInput: input.onChangeInput,
        options: input.options,
        processing: input.processing,
        processingDidFail: input.processingDidFail,
        valueInitial: input.valueInitial,
      },

      _.isFunction(props.componentProps)
        ? props.componentProps(input)
        : props.componentProps,
    ), _.isUndefined);
  },

  usePropsErrorBoundary(props, components) {
    return React.useMemo(
      () => (
        components.errorBoundary === React.Fragment
          ? {}
          : props.errorBoundaryComponentProps
      ),
      [props.errorBoundaryComponentProps, components.errorBoundary],
    );
  },

  useShouldShow(props, componentProps, Components) {
    return {
      children: !!props.children,

      component: !props.children && !!Components.component && !props.many,

      componentArray: !props.children && !!Components.component && props.many && componentProps.value,
    };
  },

  useWrapperComponentProps(props, componentProps, shouldShow) {
    return shouldShow.children
      ? {}
      : Object.assign(
        {
          inputProps: componentProps,
          variant: props.wrapperComponentVariant,
        },
        _.isFunction(props.wrapperComponentProps)
          ? props.wrapperComponentProps(componentProps)
          : props.wrapperComponentProps,
      );
  },
};
