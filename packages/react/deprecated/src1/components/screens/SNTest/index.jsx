import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { compose } from 'redux';

import { withBroadcasts } from 'lib/react-broadcasts';
import { Fields } from 'lib/react-entities';
import { Example as ExampleEntity, SomeEntity as SomeEntityEntity } from 'entities';
import withHandleChangeToSetState from 'lib/react-hoc/withHandleChangeToSetState';
import FMExample from 'components/forms/FMExample';

import ICSubscribe from './components/ICSubscribe';
import ICSomeEntityForm from './components/ICSomeEntityForm';
import ICDebounceForm from './components/ICDebounceForm';
import ICForm from './components/ICForm';
import ScreenDuck from './duck';
import SC from './styles';

const ExampleField = new Fields.EntityField({ entity: ExampleEntity });
const SomeEntityField = new Fields.EntityField({ entity: SomeEntityEntity });

const SNTest = ({ state, handleChangeToSetState }) => (
  <SC.Root>
    <ICSubscribe />

    <br /><br />
    Normal Input
    <input name="someData" value={state.get('someData')} onChange={handleChangeToSetState} />

    <br /><br />
    <ICForm
      name="formData"
      value={state.get('formData')}
      onChange={handleChangeToSetState}
    />

    <br />
    <ICDebounceForm
      name="debounceForm"
      value={state.get('debounceForm')}
      onChange={handleChangeToSetState}
    />

    <br />
    <ICSomeEntityForm
      name="someEntityForm"
      formName="someEntityForm"
      value={state.get('someEntityForm')}
      field={SomeEntityField}
      onChange={handleChangeToSetState}
    />

    <br />
    <FMExample
      name="exampleForm"
      formName="defaultForm"
      value={state.get('exampleForm')}
      field={ExampleField}
      onChange={handleChangeToSetState}
    />
  </SC.Root>
);

SNTest.propTypes = {
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
)(SNTest);
