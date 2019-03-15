import * as d3 from 'd3';
import _flowRight from 'lodash/flowRight';
import React from 'react';
import { VisualisationContext } from '@entity/visualisation';

export default {
  useGetData(props) {
    const context = React.useContext(VisualisationContext);
    const height = props.height || context.height;
    const width = props.width || context.width;

    return React.useCallback(
      _flowRight(
        data => data.filter(d => !d.children),
        data => data.descendants(),
        d3.pack()
          .size([width - props.margin, height - props.margin])
          .padding(props.padding),
        data => d3.hierarchy(data)
          .sum(d => (!d.children && d.get('gross_premium_written')) || 0),
        data => ({ children: data.toArray() }),
      ),
      [props.margin, props.padding, height, width],
    );
  },

  useHandleNodeEnter(props) {
    return React.useCallback(
      nodes => nodes
        .append('circle')
        .style('opacity', 0)
        .attr('transform', d => `translate(${d.x + (props.margin / 2)}, ${d.y + (props.margin / 2)})`),
      [props.margin],
    );
  },

  useHandleNodeUpdate(props) {
    return React.useCallback(
      nodes => nodes
        .transition('change')
        .style('opacity', 1)
        .attr('r', d => d.r || 0)
        .attr('fill', 'steelblue')
        .attr('transform', d => `translate(${d.x + (props.margin / 2)}, ${d.y + (props.margin / 2)})`)
        .duration(1000),
    );
  },

  useHandleUnmount() {
    return React.useCallback(
      nodes => nodes
        .on('mouseover', null)
        .on('mouseout', null)
        .on('click', null),
      [],
    );
  },
};
