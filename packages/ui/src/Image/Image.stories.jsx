import styled, { css, ThemeConsumer } from 'styled-components';
import React from 'react';
import { variant } from '@burnsred/theme';
import { select } from '@storybook/addon-knobs';

import UIImage from './Image';

const imageCss = css`
  margin-right: 0.5rem;
  max-width: 2rem;
  vertical-align: middle;
`;

const Wrapper = styled.div`
  display: inline-block;
  margin: 1rem;
  position: relative;

  &:after {
    content: '${props => props.label}';
    font-size: 0.75rem;
    left: 50%;
    position: absolute;
    top: calc(100% + 1rem);
    transform: translateX(-50%);
    white-space: pre;
  }
`;

export default stories => stories
  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UIImage
          css={imageCss}
          name={select('name', Object.keys(theme.images || {}), Object.keys(theme.images || {})[0])}
          variant={select('variant', variant({ name: 'component_uiImage_' })({ theme }), 'main')}
        />
      )}
    </ThemeConsumer>
  ))

  .add('names', () => (
    <ThemeConsumer>
      { theme => variant({ name: 'images_' })({ theme }).map(name => (
        <Wrapper key={name} label={name}>
          <UIImage css={imageCss} name={name} />
        </Wrapper>
      ))}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => variant({ name: 'component_uiImage_' })({ theme }).map(name => (
        <Wrapper key={name}>
          <UIImage
            name={variant({ name: 'images_' })({ theme })[0]}
            variant={name}
          />

          { name }
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
