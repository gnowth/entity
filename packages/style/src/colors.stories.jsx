import styled, { ThemeConsumer } from 'styled-components';
import React from 'react';

import { color, variant } from './selectors';

const Color = styled.div`
  background-color: ${props => color({ palette: props.name })(props)};
  display: inline-block;
  border: 1px solid black;
  border-radius: 50%;
  height: 8rem;
  position: relative;
  margin-bottom: 5rem;
  margin-right: 2rem;
  width: 8rem;

  &:after {
    content: '${props => `${props.name}: ${color({ palette: props.name })(props)}`}';
    left: 50%;
    position: absolute;
    top: calc(100% + 1rem);
    transform: translateX(-50%);
    white-space: pre;
  }
`;

export default stories => stories
  .add('palette', () => (
    <ThemeConsumer>
      { theme => variant({ name: 'palette_' })({ theme }).map(name => (
        <Color key={name} name={name} />
      ))}
    </ThemeConsumer>
  ));
