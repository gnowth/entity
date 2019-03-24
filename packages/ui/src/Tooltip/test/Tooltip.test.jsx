import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import UITooltip from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UITooltip componentProps={{ name: 'apple' }}>
      Test
    </UITooltip>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
