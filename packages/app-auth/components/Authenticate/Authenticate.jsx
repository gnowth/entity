import { useQuery } from '@entity/duck-query';
import EntityAuth from '../../entities/Auth';

function Authenticate() {
  useQuery({ action: EntityAuth.duck.actions.whoAmI() });

  return null;
}

export default Authenticate;
