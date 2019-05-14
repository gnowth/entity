import styled, { css } from 'styled-components';
import { useDefault } from '@burnsred/default';
import { colorFromPalette } from '@burnsred/theme';

const mapDefault = {
  buttonComponent: ['app_component_button', 'component_button'],
  navLinkComponent: ['app_component_navLink', 'component_navLink'],
};

const Container = styled.div`
  background-color: ${props => colorFromPalette({ paletteAsBackground: !props.$paletteAsBackground })(props)};
`;

export default {
  useComponents(props) {
    const defaults = useDefault(mapDefault, props);

    return {
      Container,
      NavLink: defaults.buttonComponent,
    };
  },

  usePropsContainer(props) {
    return props;
  },

  usePropsNavLink(props, configs = {}) {
    const defaults = useDefault(mapDefault, props);

    return {
      as: /^https?:\/\//.exec(configs.item.to)
        ? undefined
        : defaults.navLinkComponent,
      activeClassName: 'active',
      contentPaletteAsBackground: props.$paletteAsBackground,
      css: css`
        &.active {
          border-bottom: 2px solid white;
        }
      `,
      palette: props.$palette,
      paletteWeight: props.$paletteWeight,
      variant: props.variant,
      ...configs.item,
    };
  },
};
