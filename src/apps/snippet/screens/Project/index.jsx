import styled from 'styled-components';
import PropTypes from 'prop-types';
import PropTypesDuck from '@gnowth/prop-types-duck';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { QueryDuck } from '@entity/duck';

import EntityProject from 'apps/people/entities/Project';
import FormProject from 'apps/snippet/forms/Project';

const Screen = styled.div`
  background-color: white;
  border-radius: 1rem;
  margin-top: 0.5rem;
  padding: 2rem;
`;

const ScreenProject = props => (
  <Screen>
    <QueryDuck
      action={() => props.entity.duck.get({ id: null })}
      component={props.formComponent}
      componentProps={props.formComponentProps}
    />
  </Screen>
);

ScreenProject.propTypes = {
  entity: PropTypesDuck.entity,
  formComponent: PropTypesPlus.component,
  formComponentProps: PropTypes.shape({}),
};

ScreenProject.defaultProps = {
  entity: EntityProject,
  formComponent: FormProject,
  formComponentProps: {},
};

export default ScreenProject;
