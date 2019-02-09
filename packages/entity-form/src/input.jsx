import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { List } from 'immutable';

import defaultHooks from './input.hooks';
import useInput from './use-input';

const Input = (props) => {
  const hooks = Object.assign({}, defaultHooks, props.hooks);
  const input = useInput(props);
  const Components = hooks.useComponents(props, input);
  const componentProps = hooks.useGetProps(props, input, Components);
  const shouldShow = hooks.useShouldShow(props, componentProps, Components);

  return (
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
  );
};

Input.propTypes = exact({
  children: PropTypes.func,
  component: PropTypesPlus.notRequiredIf('children', PropTypesPlus.component),
  componentProps: PropTypesPlus.componentProps,
  hooks: PropTypes.shape({
    useComponents: PropTypes.func,
    useGetProps: PropTypes.func,
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
});

Input.defaultProps = {
  children: undefined,
  component: undefined,
  componentProps: {},
  hooks: undefined,
  loadOptionsFromAPI: false,
  loadValueFromAPI: false,
  many: false,
  name: undefined,
  type: undefined,
  willChangeRecord: ({ nextRecord }) => nextRecord,
  wrapperComponent: undefined,
  wrapperComponentProps: undefined,
};

export default React.memo(Input);
