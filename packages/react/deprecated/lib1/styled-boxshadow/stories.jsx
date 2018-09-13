import styled from 'styled-components';
import React from 'react';
import { storiesOf } from '@storybook/react';

import { grey300 } from 'lib/constant-colors/google-grey';

import boxshadow from './index';

const EffectWrapper = styled.div`
  background: ${grey300};
  position: relative;
  padding: 50px;
  height: 100vh;
  z-index: -1;
`;

const MaterialWrapper = styled.div`
  background: ${grey300};
  position: relative;
  padding: 50px;
  height: 100vh;
`;

const Component = styled.div`
  background: white;
  height: 200px;
`;

const Effect1 = Component.extend`
  ${boxshadow.effect1}
`;

const Effect2 = Component.extend`
  ${boxshadow.effect2}
`;

const Effect3 = Component.extend`
  ${boxshadow.effect3}
`;

const Effect4 = Component.extend`
  ${boxshadow.effect4}
`;

const Effect5 = Component.extend`
  ${boxshadow.effect5}
`;

const Effect6 = Component.extend`
  ${boxshadow.effect6}
`;

const Effect7 = Component.extend`
  ${boxshadow.effect7}
`;

const Effect8 = Component.extend`
  ${boxshadow.effect8}
`;

const Material1 = Component.extend`
  ${boxshadow.material1}
`;

const Material2 = Component.extend`
  ${boxshadow.material2}
`;

const Material3 = Component.extend`
  ${boxshadow.material3}
`;

const Material4 = Component.extend`
  ${boxshadow.material4}
`;

const Material5 = Component.extend`
  ${boxshadow.material5}
`;


storiesOf('styled-boxshadow', module)
  .addDecorator(story => <EffectWrapper>{ story() }</EffectWrapper>)
  .add('Effect1', () => <Effect1 />)
  .add('Effect2', () => <Effect2 />)
  .add('Effect3', () => <Effect3 />)
  .add('Effect4', () => <Effect4 />)
  .add('Effect5', () => <Effect5 />)
  .add('Effect6', () => <Effect6 />)
  .add('Effect7', () => <Effect7 />)
  .add('Effect8', () => <Effect8 />);

storiesOf('styled-boxshadow', module)
  .addDecorator(story => <MaterialWrapper>{ story() }</MaterialWrapper>)
  .add('Material1', () => <Material1 />)
  .add('Material2', () => <Material2 />)
  .add('Material3', () => <Material3 />)
  .add('Material4', () => <Material4 />)
  .add('Material5', () => <Material5 />);
