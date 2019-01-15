import renderer from 'react-test-renderer';
import React from 'react';

import UIWell from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UIWell />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
