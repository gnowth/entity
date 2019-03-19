import * as d3 from 'd3';
import _ from 'lodash';
import React from 'react';

export default {
  useGetData(props) {
    return React.useCallback(
      _.flowRight(
        d3.pie().value(value => props.getSize({ entity: props.entity, value })),
        data => data.toArray(),
      ),
      [props.getSize, props.entity],
    );
  },

  useHandleNodeEnter() {
    return React.useCallback(
      nodes => nodes
        .append('g')
        .attr('class', 'slice'),
      [],
    );
  },

  useHandleNodeUpdate(props) {
    const arc = React.useCallback(
      d3.arc()
        .innerRadius(0)
        .outerRadius(props.width / 2),
      [props.width],
    );

    return React.useCallback(
      nodes => nodes
        .append('path')
        .attr('fill', 'blue')
        .attr('d', arc),
      [],
    );
  },

  useHandleMount(props) {
    return React.useCallback(
      ({ graphRef }) => d3
        .select(graphRef.current)
        .attr('transform', `translate(${props.width / 2}, ${props.height / 2})`),
      [props.width, props.height],
    );
  },
};
