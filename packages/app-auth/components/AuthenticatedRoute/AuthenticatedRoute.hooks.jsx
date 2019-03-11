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
  useHandleRender(_props) {
    const Component = _props.component;
    const state = useReduxState(mapStateToProps);
    const Defaults = useDefault(mapDefault, _props);

    return routerProps => (
      <>
        { (!state.whoAmIed || state.authenticating) && (
          <Defaults.processingComponent />
        )}

        { !state.authenticating && state.currentUser && (
          <Component
            {...routerProps}
            {...(
              _isFunction(_props.componentProps)
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
