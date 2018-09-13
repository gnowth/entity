import { Map } from 'immutable';

import createScreenDuck from 'lib/duck-screens';

import ExampleEntity from 'entities/Example';

export default createScreenDuck({
  store: 'Example',
  initialState: Map({
    exampleForm: ExampleEntity.dataToRecord({}),
  }),
});
