import renderer from 'react-test-renderer';
import React from 'react';
import { Fields } from '@entity/core';

import WidgetSelect from '..';

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
