import DuckAuth from '@entity/duck-namespace-auth';
import { EntityPerson } from '@apps/people';

class Auth extends EntityPerson {
  static paths = {
    apiBase: '/auth8/v1/whoami/',
  }
}

Auth.duck = new DuckAuth({ app: 'Auth', entity: Auth });

export default Auth;
