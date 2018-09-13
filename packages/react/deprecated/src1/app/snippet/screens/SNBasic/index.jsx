import React from 'react';

import { PropTypesEntity } from 'lib/entity';
import { Screen, State } from 'lib/entity-screen';

import ScreenEntity from './entity';

const SNBasic = props => (
  <Screen entity={props.entity}>
    <State name="form_basic" />
  </Screen>
);

SNBasic.propTypes = {
  entity: PropTypesEntity.entity,
};

SNBasic.defaultProps = {
  entity: ScreenEntity,
};

export default SNBasic;
