import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';
import { List } from 'immutable';

import defaultHooks from './input.hooks';
import useContextInput from './use-context-input';

function Input(props) {
  const hooks = { ...defaultHooks, ...props.hooks };
  const input = useContextInput(props);
  const Components = hooks.useComponents(props, input);
  const componentProps = hooks.useProps(props, input, Components);
  const shouldShow = hooks.useShouldShow(props, componentProps, Components);

  return (
    <Components.errorBoundary {...hooks.usePropsErrorBoundary(props, Components)}>
      <Components.wrapper {...hooks.useWrapperComponentProps(props, componentProps, shouldShow)}>
        { shouldShow.children && props.children(componentProps) }

        { shouldShow.component && (
          <Components.component {...componentProps} />
        )}

        { shouldShow.componentArray && componentProps.value.map((val, index) => (
          <Components.component
            {...componentProps}
            errors={componentProps.field.getErrorsArray(componentProps.errors, { index })}
            index={index}
            key={componentProps.field.getId(val) || index}
            value={val}
            valueInitial={(componentProps.valueInitial || List()).get(index)}
          />
        ))}
      </Components.wrapper>
    </Components.errorBoundary>
  );
}

Input.propTypes = exact({
  children: PropTypes.func,
  component: PropTypesPlus.notRequiredIf('children', PropTypesPlus.component),
  componentProps: PropTypesPlus.componentProps,
  errorBoundaryComponent: PropTypesPlus.component,
  errorBoundaryComponentProps: PropTypes.shape({}),
  hooks: PropTypes.exact({
    useComponents: PropTypes.func,
    useProps: PropTypes.func,
    usePropsErrorBoundary: PropTypes.func,
    useShouldShow: PropTypes.func,
    useWrapperComponentProps: PropTypes.func,
  }),
  loadOptionsFromAPI: PropTypes.bool,
  loadValueFromAPI: PropTypes.bool,
  many: PropTypesPlus.notRequiredIf('children', PropTypes.bool),
  name: PropTypesPlus.string,
  type: PropTypesPlus.string,
  willChangeRecord: PropTypes.func,
  wrapperComponent: PropTypesPlus.notRequiredIf('children', PropTypesPlus.component),
  wrapperComponentProps: PropTypesPlus.componentProps,
  wrapperComponentVariant: PropTypesPlus.string,
});

Input.defaultProps = {
  children: undefined,
  component: undefined,
  componentProps: {},
  errorBoundaryComponent: undefined,
  errorBoundaryComponentProps: {},
  hooks: undefined,
  loadOptionsFromAPI: false,
  loadValueFromAPI: false,
  many: undefined,
  name: undefined,
  type: undefined,
  willChangeRecord: ({ nextRecord }) => nextRecord,
  wrapperComponent: undefined,
  wrapperComponentProps: undefined,
  wrapperComponentVariant: undefined,
};

export default React.memo(Input);
