import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import UIIcon from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UIIcon name="apple" />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
