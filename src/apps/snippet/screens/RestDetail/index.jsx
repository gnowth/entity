import PropTypes from 'prop-types';
import PropTypesDuck from '@gnowth/prop-types-duck';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { QueryDuck } from '@entity/duck';

import EntityRest from 'apps/snippet/entities/Rest';
import FormMain from 'apps/snippet/forms/Main';

const ScreenRestDetail = props => (
  <QueryDuck
    action={() => props.entity.get({ id: null })}
    component={props.formComponent}
    componentProps={props.formComponentProps}
  />
);

ScreenRestDetail.propTypes = {
  entity: PropTypesDuck.entity,
  formComponent: PropTypesPlus.component,
  formComponentProps: PropTypes.shape({}),
};

ScreenRestDetail.defaultProps = {
  entity: EntityRest,
  formComponent: FormMain,
  formComponentProps: {},
};

export default ScreenRestDetail;
