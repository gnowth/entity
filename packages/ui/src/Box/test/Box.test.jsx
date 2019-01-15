import renderer from 'react-test-renderer';
import React from 'react';

import UIBox from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UIBox />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
