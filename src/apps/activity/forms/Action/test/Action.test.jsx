import renderer from 'react-test-renderer';
import React from 'react';
import { Fields } from '@entity/core';
import { List } from 'immutable';

import App from 'components/App';
import EntityAction from 'apps/activity/entities/Action';

import FormAction from '..';

jest.mock('store');

it('renders correctly', () => {
  const tree = renderer.create(
    <App>
      <FormAction
        errors={List()}
        field={new Fields.EntityField({ entity: EntityAction })}
        onChange={() => undefined}
        value={EntityAction.dataToRecord({})}
      />
    </App>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
