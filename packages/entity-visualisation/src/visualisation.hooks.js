import * as d3 from 'd3';
import React from 'react';

import { VisualisationContext } from './context';

export default {
  useNodes(props) {
    const context = React.useContext(VisualisationContext);

    return React.useMemo(
      () => context.graphRef.current
        && context.data
        && d3.select(context.graphRef.current)
          .selectAll(props.select)
          .data(props.getData(context.data), item => props.getId({ entity: props.entity, value: item.data })),
      [props.entity, props.getData, props.getId, props.select, context.graphRef.current, context.data],
    );
  },

  useRenderVisualisation(props, visualisationRef) {
    const context = React.useContext(VisualisationContext);

    React.useEffect(
      () => {
        if (!visualisationRef.current.nodes) return;

        const nodesEnter = visualisationRef.current.onNodeEnter(visualisationRef.current.nodes.enter());

        const nodesUpdate = visualisationRef.current.onNodeUpdateOnly(visualisationRef.current.nodes);

        visualisationRef.current.onNodeUpdate(nodesUpdate.merge(nodesEnter));

        visualisationRef.current.onNodeExit(visualisationRef.current.nodes.exit());
      },
      [context.data, props.getData],
    );
  },

  useUnmount(visualisationRef) {
    React.useEffect(
      () => () => visualisationRef.current.onUnmount(visualisationRef.current.nodes),
      [],
    );
  },
};
