import PropTypesEntity from '@gnowth/prop-types-entity';
import PropTypesImmutable from 'react-immutable-proptypes';
import React from 'react';
import { ViewLink } from '@entity/view';

const ViewObservations = props => (
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
              {...props}
              value={observation}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

ViewObservations.propTypes = {
  field: PropTypesEntity.entityField.isRequired,
  value: PropTypesImmutable.list.isRequired,
};

export default React.memo(ViewObservations);
