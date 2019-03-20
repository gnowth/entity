import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import UICard from '../Card';

it('renders correctly', () => {
  const tree = renderer.create(
    <UICard />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
