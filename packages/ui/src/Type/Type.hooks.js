import styled, { css } from 'styled-components';
import { color, colorFromPalette, media, mixin, useCleanProps } from '@gnowth/theme';

const local = [
  'onChangeInput',
  'value',
];

const StringComponent = props => props.children;

const Component = styled.span`
  ${props => props.$palette && css`
    color: ${colorFromPalette()};
  `}

  ${mixin({ name: 'margin' })}
  ${mixin({ name: 'padding' })}

  ${media.print`
    color: ${color({ palette: 'black' })};
  `}

  ${props => props.css}
`;

export default {
  useComponent(props) {
    return props.as === null
      ? StringComponent
      : Component;
  },

  useProps(props) {
    return useCleanProps(props, { local });
  },
};
