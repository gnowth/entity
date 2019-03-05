import _isFunction from 'lodash/isFunction';
import React from 'react';
import { useDefault } from '@gnowth/default';
import { useReduxState } from '@private/use-redux';
import { Redirect } from 'react-router-dom';

import EntityAuth from '../../entities/Auth';

const mapDefault = {
  processingComponent: ['appAuth_component_processing', 'component_processing'],
  settings: ['settings'],
};

const mapStateToProps = state => ({
  authenticating: EntityAuth.duck.selectors.authenticating(state),
  currentUser: EntityAuth.duck.selectors.currentUser(state),
  whoAmIed: EntityAuth.duck.selectors.whoAmIed(state),
});

export default {
  useHandleRender(props) {
    const Component = props.component;
    const state = useReduxState(mapStateToProps);
    const Defaults = useDefault(mapDefault, props);

    return React.useCallback(
      routerProps => (
        <>
          { (!state.whoAmIed || state.authenticating) && (
            <Defaults.processingComponent />
          )}

          { !state.authenticating && state.currentUser && (
            <Component
              {...routerProps}
              {...(
                _isFunction(props.componentProps)
                  ? props.componentProps(routerProps)
                  : props.componentProps
              )}
            />
          )}

          { !!state.whoAmIed && !state.authenticating && !state.currentUser && (
            <Redirect to={`${Defaults.settings.URL_LOGIN}?redirect=${routerProps.location.pathname}${routerProps.location.search}`} />
          )}
        </>
      ),

      [state, Defaults.settings, Defaults.processingComponent, props.componentProps],
    );
  },
};
