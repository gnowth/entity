import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { filterProps } from '@gnowth/higher-order-component';
import { UITypeSet } from '@gnowth/ui';

const ViewTypeSet = props => (
  <UITypeSet {...filterProps(props)}>
    { props.field.toString(props.value) }
  </UITypeSet>
);

ViewTypeSet.propTypes = {
  field: PropTypesEntity.field.isRequired,
  value: PropTypesPlus.value,
};

ViewTypeSet.defaultProps = {
  value: undefined,
};

export default ViewTypeSet;
