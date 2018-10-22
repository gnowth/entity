import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesDuck from '@gnowth/prop-types-duck';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { Query } from '@entity/duck-query';

import EntityObservation from 'apps/observation/entities/Observation';
import FormObservation from 'apps/observation/forms/Observation';

const Screen = styled.div`
  background-color: white;
  border-radius: 1rem;
  margin-top: 0.5rem;
  padding: 2rem;
`;

const ScreenObservation = props => (
  <Screen>
    <Query
      action={() => props.entity.duck.get({ id: null })}
      component={props.formComponent}
    />
  </Screen>
);

ScreenObservation.propTypes = {
  entity: PropTypesDuck.entity,
  formComponent: PropTypesPlus.component,
  formComponentProps: PropTypes.shape({}),
};

ScreenObservation.defaultProps = {
  entity: EntityObservation,
  formComponent: FormObservation,
  formComponentProps: {},
};

export default ScreenObservation;
