import renderer from 'react-test-renderer';
import React from 'react';
import { List } from 'immutable';

import UIErrorWell from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <UIErrorWell errors={List()} />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
