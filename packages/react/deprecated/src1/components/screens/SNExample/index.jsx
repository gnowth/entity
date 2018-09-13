import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { compose } from 'redux';

import { withBroadcasts } from 'lib/react-broadcasts';
import { Fields } from 'lib/react-entities';
import withHandleChangeToSetState from 'lib/react-hoc/withHandleChangeToSetState';
import FMExample from 'components/forms/FMExample';
import ExampleEntity from 'entities/Example';

import ICUser from './components/ICUser';
import ScreenDuck from './duck';
import SC from './styles';

const ExampleField = new Fields.EntityField({ entity: ExampleEntity });

const SNExample = ({ state, handleChangeToSetState }) => (
  <SC.Root>
    <ICUser />
    <FMExample
      name="exampleForm"
      formName="defaultForm"
      value={state.get('exampleForm')}
      field={ExampleField}
      onChange={handleChangeToSetState}
    />
  </SC.Root>
);

SNExample.propTypes = {
  state: PropTypesImmutable.map.isRequired,
  handleChangeToSetState: PropTypes.func.isRequired,
};

export default compose(
  // ScreenDuck.connectSelectors({
  //   state: ({ props, selectors }) => selectors.state({ id: props.id }),
  // }),
  // ScreenDuck.connectActions({
  //   setState: ({ props, actions }) => actions.setState({ id: props.id }),
  // }),
  ScreenDuck.connectDefault(),
  withBroadcasts({ state: 'screenState', setState: 'screenSetState' }),
  withHandleChangeToSetState(),
)(SNExample);
