import centered from '@storybook/addon-centered';
import styled, { css, ThemeConsumer } from 'styled-components';
import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import UIImage from '.';

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

export default mod => storiesOf('UI/Image', mod)
  .addDecorator(centered)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)

  .add('dynamic story', () => (
    <ThemeConsumer>
      { theme => (
        <UIImage
          css={imageCss}
          name={select('name', Object.keys(theme.images || {}), Object.keys(theme.images || {})[0])}
          variant={select('variant', Object.keys(theme.components?.uiImage || {}), 'main')}
        />
      )}
    </ThemeConsumer>
  ))

  .add('names', () => (
    <ThemeConsumer>
      { theme => Object.keys(theme.images || {}).map(name => (
        <Wrapper key={name} label={name}>
          <UIImage css={imageCss} name={name} />
        </Wrapper>
      ))}
    </ThemeConsumer>
  ))

  .add('variants', () => (
    <ThemeConsumer>
      { theme => Object.keys(theme.components?.uiImage || {}).map(variant => (
        <Wrapper key={variant}>
          <UIImage
            name={Object.keys(theme.images || {})[0]}
            variant={variant}
          />

          { variant }
        </Wrapper>
      ))}
    </ThemeConsumer>
  ));
