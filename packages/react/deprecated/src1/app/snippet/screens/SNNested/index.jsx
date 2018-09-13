import React from 'react';
import PropTypes from 'prop-types';

import { PropTypesEntity } from 'lib/entity';
import { Screen, State } from 'lib/entity-screen';
import FMNested from 'app/snippet/forms/FMNested';

import ScreenEntity from './entity';

const SNNested = props => (
  <Screen entity={props.entity}>
    <State
      name="form_nested"
      component={props.form}
    />
  </Screen>
);

SNNested.propTypes = {
  entity: PropTypesEntity.entity,
  form: PropTypes.func,
};

SNNested.defaultProps = {
  entity: ScreenEntity,
  form: FMNested,
};

export default SNNested;
