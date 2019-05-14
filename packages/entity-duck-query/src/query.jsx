import _ from 'lodash';
import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesPlus from '@burnsred/prop-types-plus';
import React from 'react';

import defaultHooks from './query.hooks';

function Query(props) {
  const hooks = { ...defaultHooks, ...props.hooks };
  const Components = hooks.useComponents(props);
  const componentProps = hooks.usePropsComponent(props);
  const shouldShow = hooks.useShouldShow(props, componentProps, Components);

  const Component = props.component;

  return (
    <Components.errorBoundaryComponent {...hooks.usePropsErrorBoundary(props, Components)}>
      { shouldShow.children && props.children(componentProps) }

      { shouldShow.processingComponent && (
        <Components.processingComponent
          variant="processing"
          {...props.processingComponentProps}
        />
      )}

      { shouldShow.processingDidFailComponent && (
        <Components.processingDidFailComponent {...props.processingDidFailComponentProps} />
      )}

      { shouldShow.recordCountComponent && (
        <Components.recordCountComponent
          value={
            componentProps.field.entity.paginated && componentProps.pagination
              ? componentProps.pagination.get('count')
              : componentProps.value.size
          }
          {...props.recordCountComponentProps}
        />
      )}

      { shouldShow.recordCountNoneComponent && (
        <Components.recordCountNoneComponent {...props.recordCountNoneComponentProps} />
      )}

      { shouldShow.component && (
        <Component
          {...componentProps}
          {...(_.isFunction(props.componentProps)
            ? props.componentProps(componentProps)
            : props.componentProps
          )}
        />
      )}

      { shouldShow.componentArray && componentProps.value.map((value, index) => (
        <Component
          {...componentProps}
          key={componentProps.field.getEntityId(value)}
          errors={componentProps.field.getErrorsArray(componentProps.errors, { index })}
          index={index}
          value={value}
          {...(_.isFunction(props.componentProps)
            ? props.componentProps(Object.assign({}, componentProps, {
              index,
              value,
              errors: componentProps.field.getErrorsArray(componentProps.errors, { index }),
              valueInitial: componentProps.valueInitial && componentProps.valueInitial.get(index),
              records: componentProps.value,
            }))
            : props.componentProps
          )}
          valueInitial={componentProps.valueInitial && componentProps.valueInitial.get(index)}
        />
      ))}
    </Components.errorBoundaryComponent>
  );
}

Query.propTypes = exact({
  action: PropTypesPlus.action.isRequired,
  cached: PropTypes.bool,
  children: PropTypesPlus.allOfType([
    PropTypesPlus.isRequiredIfNot('component', PropTypes.func),
    PropTypesPlus.notRequiredIf('component', PropTypes.func),
  ]),
  component: PropTypesPlus.isRequiredIf('componentProps', PropTypesPlus.component),
  componentProps: PropTypes.shape({}),
  errorBoundaryComponent: PropTypesPlus.component,
  errorBoundaryComponentProps: PropTypes.shape({}),
  hooks: PropTypes.exact({
    useComponents: PropTypes.func,
    usePropsComponent: PropTypes.func,
    usePropsErrorBoundary: PropTypes.func,
    useShouldShow: PropTypes.func,
  }),
  many: PropTypesPlus.notRequiredIf('action', PropTypes.bool),
  persist: PropTypes.bool,
  persistDirty: PropTypesPlus.notRequiredIfNot('persist', PropTypes.bool),
  processingComponent: PropTypesPlus.component,
  processingComponentProps: PropTypes.shape({}),
  processingDidFailComponent: PropTypesPlus.component,
  processingDidFailComponentProps: PropTypes.shape({}),
  recordCountComponent: PropTypesPlus.component,
  recordCountComponentProps: PropTypes.shape({}),
  recordCountHidden: PropTypes.bool,
  recordCountNoneComponent: PropTypesPlus.component,
  recordCountNoneComponentProps: PropTypes.shape({}),
  shouldProcess: PropTypes.bool,
});

Query.defaultProps = {
  cached: false,
  children: undefined,
  component: undefined,
  componentProps: {},
  errorBoundaryComponent: undefined,
  errorBoundaryComponentProps: {},
  hooks: undefined,
  many: undefined,
  persist: true,
  persistDirty: undefined,
  processingComponent: undefined,
  processingComponentProps: {},
  processingDidFailComponent: undefined,
  processingDidFailComponentProps: {},
  recordCountComponent: undefined,
  recordCountComponentProps: {},
  recordCountHidden: false,
  recordCountNoneComponent: undefined,
  recordCountNoneComponentProps: {},
  shouldProcess: true,
};

export default React.memo(Query);
