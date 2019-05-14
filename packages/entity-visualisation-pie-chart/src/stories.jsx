import * as d3 from 'd3';
import React from 'react';
import { Graph } from '@burnsred/entity-visualisation';
import { List, Map } from 'immutable';

import VisualisationPieChart from './visualisation';

export default stories => stories
  .add('basic', () => (
    <Graph
      data={List([
        Map({ value: 5 }),
        Map({ value: 7 }),
      ])}
      height={500}
      onChange={() => undefined}
      value={Map()}
      width={500}
    >
      <VisualisationPieChart
        color={d3.scaleLinear()
          .domain([-1, 5])
          .range(['hsla(0, 0%, 96%, 1)', 'hsla(169, 99%, 34%, 1)'])
          .interpolate(d3.interpolateHcl)
        }
        height={500}
        onChange={() => undefined}
        width={500}
      />
    </Graph>
  ));
