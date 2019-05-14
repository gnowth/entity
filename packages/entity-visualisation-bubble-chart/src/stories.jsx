import * as d3 from 'd3';
import React from 'react';
import { Graph } from '@burnsred/entity-visualisation';
import { List, Map } from 'immutable';

import Visualisation from './visualisation';

export default stories => stories
  .add('basic', () => (
    <Graph
      data={List([
        {
          color_index: 1,
          name: 'sdfsdggg1',
          size: 400,
          type: 'sdfsdgg1',
          uuid: 'dfdf1',
        },
        {
          color_index: 1,
          name: 'sdfsdggg2',
          size: 100,
          type: 'sdfsdgg2',
          uuid: 'dfdf2',
        },
        {
          color_index: 1,
          name: 'sdfsdggg2',
          size: 300,
          type: 'sdfsdgg2',
          uuid: 'dfdf2',
        },
      ])}
      height={500}
      onChange={() => undefined}
      value={Map()}
      width={500}
    >
      <Visualisation
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
