import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';
import { Fields } from '@burnsred/entity';

import WidgetSelect from '../Select';

it('renders correctly', () => {
  const tree = renderer.create(
    <WidgetSelect
      field={new Fields.CharField()}
      name="test"
      onChange={() => undefined}
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
