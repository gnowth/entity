import renderer from 'react-test-renderer';
import React from 'react';

import UISpacer from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UISpacer />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
