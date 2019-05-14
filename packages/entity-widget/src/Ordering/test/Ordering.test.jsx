import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';
import { Fields } from '@burnsred/entity';

import WidgetOrdering from '../Ordering';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetOrdering
      field={new Fields.EnumField()}
      label="test"
      name="test"
      onChange={() => undefined}
      orderingKey="test"
      value=""
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
