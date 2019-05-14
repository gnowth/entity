import DuckDjangoRestFramework from '@burnsred/entity-duck-namespace-drf';

export default class Auth extends DuckDjangoRestFramework.Queries {
  statusMap = {
    whoAmI: 'authenticating',
  };

  statusMapDidFail = {
    whoAmI: 'authenticatingDidFail',
  }

  supportedActions = {
    clear: ['!whoAmI'],
    errors: ['whoAmI'],
    onChange: ['!whoAmI'],
    onSubmit: ['!whoAmI'],
    pagination: ['!whoAmI'],
    processing: ['whoAmI'],
    processingDidFail: ['whoAmI'],
    value: ['whoAmI'],
    valueInitial: ['!whoAmI'],
  }
}
