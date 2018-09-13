import PropTypes from 'prop-types';
import React from 'react';

import { QueryDuck } from 'lib/entity-duck';
import EntityScreenLocal from 'apps/snippet/entities/ScreenLocal';
import FormMain from 'apps/snippet/forms/Main';
import PropTypesDuck from 'lib/prop-types/Duck';
import PropTypesPlus from 'lib/prop-types/Plus';

const ScreenLocal = props => (
  <QueryDuck
    action={props.entity.duck.get}
    component={props.formComponent}
    componentProps={props.formComponentProps}
  />
);

ScreenLocal.propTypes = {
  entity: PropTypesDuck.entity,
  formComponent: PropTypesPlus.component,
  formComponentProps: PropTypes.shape({}),
};

ScreenLocal.defaultProps = {
  entity: EntityScreenLocal,
  formComponent: FormMain,
  formComponentProps: {},
};

export default ScreenLocal;
