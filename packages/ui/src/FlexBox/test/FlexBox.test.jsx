import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import UIFlexBox from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UIFlexBox />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
