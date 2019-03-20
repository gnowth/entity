import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';

import UIFlexBox from '../FlexBox';

it('renders correctly', () => {
  const tree = renderer.create(
    <UIFlexBox />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
