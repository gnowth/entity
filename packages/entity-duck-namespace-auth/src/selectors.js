import DuckDjangoRestFramework from '@burnsred/entity-duck-namespace-drf';

export default class Auth extends DuckDjangoRestFramework.Selectors {
  authenticating(state) {
    return this.getState(state).getIn(['status', 'authenticating']);
  }

  authenticatingDidFail(state) {
    return this.getState(state).getIn(['status', 'authenticatingDidFail']);
  }

  currentUser(state) {
    return this.getState(state).get('detail');
  }

  errors(state) {
    return this.getState(state).get('errors');
  }

  hasPermissions() {
    return undefined;
  }

  meta() {
    return undefined;
  }

  pagination() {
    return undefined;
  }

  record(state) {
    return this.getState(state).get('detail');
  }

  whoAmIed(state) {
    return this.getState(state).getIn(['status', 'whoAmIed']);
  }
}
