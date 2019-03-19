import 'jest-styled-components';
import renderer from 'react-test-renderer';
import React from 'react';
import { Fields } from '@entity/core';
import { List } from 'immutable';

import App from 'components/App';
import EntityActivity from 'apps/activity/entities/Activity';

import FormControls from '..';

jest.mock('store');

it('renders correctly', () => {
  const tree = renderer.create(
    <App>
      <FormControls
        errors={List()}
        field={new Fields.EntityField({ entity: EntityActivity })}
        onChange={() => undefined}
        onSubmit={() => undefined}
        value={EntityActivity.dataToRecord({})}
      />
    </App>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
