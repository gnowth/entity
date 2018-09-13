import React from 'react';

import { Screen, State } from 'lib/entity-screen';

import FormBasicEntity from '../../entities/FormBasic';
import FormBasic from '../../forms/FormBasic';
import ScreenBasicEntity from './entity';

const ScreenBasic = () => (
  <Screen entity={ScreenBasicEntity}>
    <State
      name="form_basic"
      component={FormBasic}
      componentProps={{
        field: FormBasicEntity.toEntityField(),
      }}
    />
  </Screen>
);

export default ScreenBasic;
