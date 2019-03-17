import PropTypes from 'prop-types';
import PropTypesEntity from '@gnowth/prop-types-entity';
import React from 'react';
import { Visualisation } from '@entity/visualisation';

import hooks from './visualisation.hooks';

const VisualisationBubbleChart = props => (
  <Visualisation
    entity={props.entity}
    getData={hooks.useGetData(props)}
    onNodeEnter={hooks.useHandleNodeEnter(props)}
    onNodeUpdate={hooks.useHandleNodeUpdate(props)}
    onUnmount={hooks.useHandleUnmount(props)}
    select="circle"
  />
);

/* eslint-disable react/no-unused-prop-types */
VisualisationBubbleChart.propTypes = {
  entity: PropTypesEntity.entity.isRequired,
  height: PropTypes.number,
  margin: PropTypes.number,
  padding: PropTypes.number,
  width: PropTypes.number,
};
/* eslint-enable react/no-unused-prop-types */

VisualisationBubbleChart.defaultProps = {
  height: undefined,
  margin: 40,
  padding: 10,
  width: undefined,
};

export default React.memo(VisualisationBubbleChart);
