import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import UIPortal from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UIPortal />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
