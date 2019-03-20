import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import UIProgressCircle from '../ProgressCircle';

it('renders correctly', () => {
  const tree = renderer.create(
    <UIProgressCircle />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
