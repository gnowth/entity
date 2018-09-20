import PropTypes from 'prop-types';
import React from 'react';
import { QueryDuck } from '@gnowth/entity-duck';

import EntityProject from 'apps/people/entities/Project';
import FormProject from 'apps/snippet/forms/Project';
import PropTypesDuck from 'lib/prop-types/Duck';
import PropTypesPlus from 'lib/prop-types/Plus';

const ScreenProject = props => (
  <QueryDuck
    action={() => props.entity.duck.get({ id: null })}
    component={props.formComponent}
    componentProps={props.formComponentProps}
  />
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
