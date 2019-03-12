import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import _isUndefined from 'lodash/isUndefined';
import _omitBy from 'lodash/omitBy';
import React from 'react';
import { useDefault } from '@gnowth/default';

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
    return _omitBy(Object.assign(
      {
        name: props.name,
        onChange: input.onChange,
        onSubmit: input.onSubmit,
        value: input.value,
      },

      (props.children || !_isString(Components.component)) && {
        errors: input.errors,
        field: input.field,
        onChangeInput: input.onChangeInput,
        options: input.options,
        processing: input.processing,
        processingDidFail: input.processingDidFail,
        valueInitial: input.valueInitial,
      },

      _isFunction(props.componentProps)
        ? props.componentProps(input)
        : props.componentProps,
    ), _isUndefined);
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
        { variant: props.wrapperComponentVariant },
        componentProps,
        {
          css: undefined,
          label: undefined,
        },
        _isFunction(props.wrapperComponentProps)
          ? props.wrapperComponentProps(componentProps)
          : props.wrapperComponentProps,
      );
  },
};
