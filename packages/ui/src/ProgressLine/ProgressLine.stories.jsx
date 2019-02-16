import styled from 'styled-components';
import React from 'react';
import { select } from '@storybook/addon-knobs';

import UIProgressLine from '.';

const Block = styled.div`
  width: 300px;
`;

export default stories => stories
  .add('dynamic story', () => (
    <Block>
      <UIProgressLine
        color={select('color', ['blue', 'red', 'black'])}
        colorBuffer={select('colorBuffer', ['blue', 'red', 'black'])}
        height={select('height', ['1px', '2px', '4px', '8px', '16px'], '4px')}
        value={select('value', [null, 0, 33, 50, 100], null)}
      />
    </Block>
  ));
