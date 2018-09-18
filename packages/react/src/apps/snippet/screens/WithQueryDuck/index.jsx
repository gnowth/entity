import _compose from 'lodash/fp/compose';
import exact from 'prop-types-exact';
import React from 'react';

import { Form } from 'lib/entity-form';
import EntityScreenLocal from 'apps/snippets/entities/ScreenLocal';
import withPropTypes from 'lib/higher-order-component/withPropTypes';

const ScreenWithQueryDuck = props => (
  <Form {...props}>
    { props.filterComponent && (
      <Input
        name="filters"
        component={props.filterComponent}
        componentProps={props.filterComponentProps}
      />
    )}

    <Input name="filters">
      { context => context.value && (
        <QueryDuck
          action={() => props.listEntity.get({
            params: context.field.entity.asParams(context.value).merge(props.listFilterParams),
          })}
          component={props.listComponent}
          componentProps={props.listComponentProps}
        />
      )}
    </Input>

    { props.paginationComponent && (
      <Input
        name="filters"
        component={props.paginationComponent}
        componentProps={props.paginationComponentProps}
      />
    )}
  </Form>
);

ScreenWithQueryDuck.propTypes = exact({
  field: PropTypesEntity.entityField.isRequired,
  filterComponent: PropTypesPlus.component,
  filterComponentProps: PropTypes.shape({}),
  listComponent: PropTypesPlus.component,
  listEntity: PropTypesDuck.entity,
  listFilterParams: PropTypesImmutable.mapOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  paginationComponent: PropTypesPlus.component,
  paginationComponentProps: PropTypes.shape({}),
  value: PropTypesImmutable.map.isRequired,
});

export default _compose(
  withPropTypes({
    displayName: 'ScreenWithQueryDuck',

    propTypes: exact({
      entity: PropTypesDuck.entity,
    }),

    defaultProps: {
      entity: EntityScreenLocal,
    },
  }),

  withQueryDuck({ action: props => props.entity.duck.get }),
)(ScreenWithQueryDuck);
