import PropTypes from 'prop-types';
import PropTypesEntity from '@burnsred/prop-types-entity';
import React from 'react';
import { Graph, Visualisation, VisualisationContext } from '@burnsred/entity-visualisation';

import hooks from './visualisation.hooks';

function VisualisationPieChart(_props) {
  const context = React.useContext(VisualisationContext);
  const height = _props.height || context.height;
  const width = _props.width || context.width;
  const props = { ..._props, height, width };

  return (
    <Graph
      {...context}
      component="g"
      height={height}
      onMount={hooks.useHandleMount(props)}
      width={width}
    >
      <Visualisation
        entity={props.entity}
        getData={hooks.useGetData(props)}
        onNodeEnter={hooks.useHandleNodeEnter(props)}
        onNodeUpdate={hooks.useHandleNodeUpdate(props)}
        select="g.slice"
      />
    </Graph>
  );
}

VisualisationPieChart.propTypes = {
  entity: PropTypesEntity.entity.isRequired,
  getSize: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
};

VisualisationPieChart.defaultProps = {
  getSize: ({ entity, value }) => entity.getSize(value),
  height: undefined,
  width: undefined,
};

export default React.memo(VisualisationPieChart);
