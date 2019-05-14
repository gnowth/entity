import PropTypesEntity from '@burnsred/prop-types-entity';
import React from 'react';
import { useDefault } from '@burnsred/default';

import { Context } from '../context';

const mapDefault = {
  useQuery: ['appAuth_hook_useQuery', 'hook_useQuery'],
};

function Authenticate(props) {
  const Defaults = useDefault(mapDefault, props);
  const context = React.useContext(Context);

  const entity = props.authEntity || context.authEntity;

  Defaults.useQuery({ action: entity.duck.actions.whoAmI() });

  return null;
}

Authenticate.propTypes = {
  authEntity: PropTypesEntity.entity,
};

Authenticate.defaultProps = {
  authEntity: undefined,
};

export default Authenticate;
