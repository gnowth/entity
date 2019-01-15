import renderer from 'react-test-renderer';
import React from 'react';

import UILabel from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UILabel />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
