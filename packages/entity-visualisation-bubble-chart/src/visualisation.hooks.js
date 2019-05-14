import * as d3 from 'd3';
import _ from 'lodash';
import React from 'react';
import { VisualisationContext } from '@burnsred/entity-visualisation';

export default {
  useClearHoverOnScroll(setHover) {
    React.useEffect(
      () => {
        const clearHover = () => setHover(null);

        document.addEventListener('scroll', clearHover);

        return () => {
          document.removeEventListener('scroll', clearHover);
        };
      },
      [],
    );
  },

  useGetData(props) {
    const context = React.useContext(VisualisationContext);
    const height = props.height || context.height;
    const width = props.width || context.width;

    return React.useCallback(
      _.flowRight([
        data => data.filter(d => !d.children),
        data => data.descendants(),
        d3.pack()
          .size([width - props.margin, height - props.margin])
          .padding(props.padding),
        data => d3.hierarchy(data)
          .sum(value => (!value.children && props.getSize({ entity: props.entity, value })) || 0),
        data => ({ children: data.toArray() }),
      ]),
      [props.margin, props.padding, height, width, props.getSize, props.entity],
    );
  },

  useHandleNodeEnter(props) {
    return React.useCallback(
      nodes => nodes
        .append('circle')
        .attr('class', props.className)
        .style('opacity', 0)
        .attr('transform', d => `translate(${d.x + (props.margin / 2)}, ${d.y + (props.margin / 2)})`),
      [props.margin],
    );
  },

  useHandleNodeUpdate(props, configs) {
    return React.useCallback(
      nodes => nodes
        .on('mouseover', function mouseover(d) {
          configs.setHover({ d, itemRef: this });
        })
        .on('mouseout', () => configs.setHover(null))
        .transition('change')
        .style('opacity', 1)
        .attr('r', d => d.r || 0)
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

  usePropsPortal(props, configs = {}) {
    const rect = configs.itemRef && configs.itemRef.getBoundingClientRect();

    return {
      itemPositionX: rect && (rect.x + configs.d.r),
      itemPositionY: rect && (rect.y + configs.d.r),
    };
  },
};
