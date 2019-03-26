import renderer from 'react-test-renderer';
import React from 'react';
import { EntityTitle, Fields } from '@entity/core';

import ViewRedirectOnCreate from '..';

const Redirect = () => <div>Redirected</div>;

it('renders correctly', () => {
  const tree = renderer.create(
    <ViewRedirectOnCreate
      field={new Fields.EntityField({ entity: EntityTitle })}
      to="root"
      redirectComponent={Redirect}
      value={EntityTitle.dataToRecord({})}
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
