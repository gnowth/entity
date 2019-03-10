import _isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import PropTypesPlus from '@gnowth/prop-types-plus';
import React from 'react';
import { useEnhanceProps } from '@gnowth/style';


import { Context } from './context';
import hooks from './navigation.hooks';

function Navigation(_props) {
  const context = React.useContext(Context);
  const props = useEnhanceProps(_props, { hooks });

  const { Container, NavLink } = props.hooks.useComponents(props);

  const navigations = _isFunction(context.entity.navigations?.[props.name])
    ? context.entity.navigations[props.name](props.entityConfigs)
    : context.entity.navigations?.[props.name];

  return (
    <Container {...props.hooks.usePropsContainer(props)}>
      { navigations?.map(item => (
        <NavLink {...props.hooks.usePropsNavLink(props, { item })} />
      )) || null}
    </Container>
  );
}

Navigation.propTypes = {
  containerComponent: PropTypesPlus.component,
  containerComponentProps: PropTypes.shape({}),
  entityConfigs: PropTypes.shape({}),
  hooks: PropTypes.exact({
    useComponents: PropTypes.func,
    usePropsContainer: PropTypes.func,
    usePropsNavLink: PropTypes.func,
  }),
  name: PropTypes.string.isRequired,
  navLinkComponent: PropTypesPlus.component,
  navLinkComponentProps: PropTypes.shape({}),
  palette: PropTypesPlus.string,
  paletteAsBackground: PropTypes.bool,
  paletteWeight: PropTypes.string,
};

Navigation.defaultProps = {
  containerComponent: undefined,
  containerComponentProps: undefined,
  entityConfigs: undefined,
  hooks: undefined,
  navLinkComponent: undefined,
  navLinkComponentProps: undefined,
  palette: undefined,
  paletteAsBackground: undefined,
  paletteWeight: undefined,
};

export default Navigation;
