import renderer from 'react-test-renderer';
import React from 'react';
import { Fields } from '@entity/core';
import { IntlProvider } from 'react-intl';

import ViewTypeSet from '..';

it('renders correctly', () => {
  const tree = renderer.create(
    <IntlProvider locale="en" messages={{}}>
      <ViewTypeSet
        field={new Fields.CharField()}
        theme={{}}
        value="test"
      />
    </IntlProvider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
