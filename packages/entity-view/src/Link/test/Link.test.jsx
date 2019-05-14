import renderer from 'react-test-renderer';
import React from 'react';
import { EntityTitle, Fields } from '@burnsred/entity';
import { HashRouter as Router } from 'react-router-dom';

import ViewLink from '../Link';

class EntityTest extends EntityTitle {
  static paths = {
    urlBase: '/test/',
  }
}

it('renders correctly', () => {
  const tree = renderer.create(
    <Router>
      <ViewLink
        field={new Fields.EntityField({ entity: EntityTest })}
        value={EntityTest.dataToRecord({})}
      />
    </Router>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
