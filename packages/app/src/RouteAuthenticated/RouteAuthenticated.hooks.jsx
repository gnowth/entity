import _ from 'lodash';
import React from 'react';
import { useDefault } from '@burnsred/default';
import { useReduxState } from '@private/use-redux';
import { Redirect } from 'react-router-dom';

import { Context } from '../context';

const mapDefault = {
  processingComponent: ['appAuth_component_processing', 'component_processing'],
  settings: ['settings'],
};

export default {
  useHandleRender(_props) {
    const Component = _props.component;
    const Defaults = useDefault(mapDefault, _props);

    const context = React.useContext(Context);

    const entity = _props.authEntity || context.authEntity;
    const mapStateToProps = React.useCallback(
      state => ({
        authenticating: entity.duck.selectors.authenticating(state),
        currentUser: entity.duck.selectors.currentUser(state),
        whoAmIed: entity.duck.selectors.whoAmIed(state),
      }),
      [entity],
    );
    const state = useReduxState(mapStateToProps);

    return routerProps => (
      <>
        { (!state.whoAmIed || state.authenticating) && (
          <Defaults.processingComponent variant="processing" />
        )}

        { !state.authenticating && state.currentUser && (
          <Component
            {...routerProps}
            {...(
              _.isFunction(_props.componentProps)
                ? _props.componentProps(routerProps)
                : _props.componentProps
            )}
          />
        )}

        { !!state.whoAmIed && !state.authenticating && !state.currentUser && (
          <Redirect to={`${Defaults.settings.URL_LOGIN}?redirect=${routerProps.location.pathname}${routerProps.location.search}`} />
        )}
      </>
    );
  },
};
