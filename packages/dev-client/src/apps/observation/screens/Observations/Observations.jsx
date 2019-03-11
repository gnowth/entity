import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';
import { withQuery } from '@entity/duck-query';
import { ViewLink } from '@entity/view';

import EntityObservation from 'apps/observation/entities/Observation';

export const Observations = props => (
  <table>
    <thead>
      <tr><th>Test</th></tr>
    </thead>

    <tbody>
      { props.value.map(observation => (
        <tr key={props.field.getId(observation)}>
          <td>{ props.field.getId(observation) }</td>
          <td>{ props.field.toString(observation) }</td>
          <td>
            <ViewLink
              field={props.field}
              value={observation}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

Observations.propTypes = {
  field: PropTypesEntity.entityField.isRequired,
  value: PropTypesImmutable.list.isRequired,
};

export default withQuery({
  action: EntityObservation.duck.actions.get(),
})(Observations);
