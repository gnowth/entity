import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import PropTypesDuck from '@gnowth/prop-types-duck';
import PropTypesImmutable from 'react-immutable-proptypes';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { QueryDuck } from '@entity/duck';
import { Map } from 'immutable';

import EntityRest from 'apps/snippet/entities/Rest';
import FormMain from 'apps/snippet/forms/Main';

const ScreenRestList = props => (
  <QueryDuck
    action={() => props.entity.get({ params: props.filterParams })}
    component={props.formComponent}
    componentProps={props.formComponentProps}
    many
  />
);

ScreenRestList.propTypes = exact({
  entity: PropTypesDuck.entity,
  formComponent: PropTypesPlus.component,
  formComponentProps: PropTypes.shape({}),
  filterParams: PropTypesImmutable.mapOf(PropTypes.string),
});

ScreenRestList.defaultProps = {
  entity: EntityRest,
  formComponent: FormMain,
  formComponentProps: {},
  filterParams: Map(),
};

export default ScreenRestList;
