import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import UIProgressLine from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UIProgressLine />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
