import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import React from 'react';
import { useDefault } from '@gnowth/default';

export default {
  useComponents: (props, input) => {
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

  useGetProps: (props, input, Components) => Object.assign(
    {
      name: props.name,
      onChange: input.onChange,
      value: input.value,
    },

    (props.children || !_isString(Components.component)) && {
      errors: input.errors,
      field: input.field,
      onInputChange: input.onInputChange,
      options: input.options,
      processing: input.processing,
      processingDidFail: input.processingDidFail,
      valueInitial: input.valueInitial,
    },

    _isFunction(props.componentProps)
      ? props.componentProps(input)
      : props.componentProps,
  ),

  useGetPropsComponentErrorBoundary: (props, components) => React.useMemo(
    () => (
      components.errorBoundary === React.Fragment
        ? {}
        : props.errorBoundaryComponentProps
    ),
    [props.errorBoundaryComponentProps, components.errorBoundary],
  ),

  useShouldShow: (props, componentProps, Components) => ({
    children: !!props.children,

    component: !props.children && !!Components.component && !props.many,

    componentArray: !props.children && !!Components.component && props.many && componentProps.value,
  }),

  useWrapperComponentProps: (props, componentProps, shouldShow) => (
    shouldShow.children
      ? {}
      : Object.assign(
        {},
        componentProps,
        _isFunction(props.wrapperComponentProps)
          ? props.wrapperComponentProps(componentProps)
          : props.wrapperComponentProps,
      )
  ),
};
